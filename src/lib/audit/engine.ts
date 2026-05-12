import { Transaction, runStage1 } from './stage1-deterministic';
import { runStage2 } from './stage2-payload';
import { runStage3 } from './stage3-verify';
import Anthropic from '@anthropic-ai/sdk';
import { prisma } from '../db/prisma';
import { sendEmail } from '../email/resend';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function runAuditEngine(
  reportId: string, 
  clientId: string, 
  firmId: string, 
  transactions: Transaction[],
  pushEvent: (event: string, data: any) => void
) {
  try {
    pushEvent('stage_1_start', { totalRows: transactions.length });
    
    const flags = await runStage1(transactions, (msg, rowsProcessed) => {
      pushEvent('stage_1_progress', { message: msg, rowsProcessed });
    });
    
    pushEvent('stage_1_complete', { flagCount: flags.length });
    
    const stage2 = await runStage2(transactions, flags);
    
    await prisma.report.update({
      where: { id: reportId },
      data: { promptVersionHash: stage2.promptHash }
    });
    
    pushEvent('stage_2_complete', { payloadTokens: stage2.payloadTokens });
    
    let claudeResponseStr = '';
    let retries = 0;
    while (retries <= 2) {
      try {
        const msg = await anthropic.messages.create({
          model: 'claude-3-5-sonnet-20240620',
          max_tokens: 1500,
          system: stage2.systemPrompt,
          messages: [{ role: 'user', content: stage2.payload }],
        }, { timeout: 10000 });
        claudeResponseStr = (msg.content[0] as any).text || '';
        break;
      } catch (err: any) {
        if (err.status === 429 || err.status === 503 || err.name === 'TimeoutError' || err.name === 'AbortError' || err.type === 'timeout') {
          retries++;
          if (retries > 2) throw new Error('Claude API retries exhausted');
          await new Promise(r => setTimeout(r, retries === 1 ? 1000 : 3000));
        } else {
          throw err;
        }
      }
    }
    
    const stage3 = await runStage3(transactions, claudeResponseStr);
    
    for (const p of stage3.passed) {
      const issue = await prisma.issue.create({
        data: {
          reportId,
          severity: p.severity,
          title: p.title,
          description: p.description,
          recommendedAction: p.recommendedAction,
          transactionRef: p.transactionRef
        }
      });
      pushEvent('finding_verified', { findingId: issue.id, severity: p.severity, title: p.title });
    }
    
    for (const r of stage3.rejected) {
      await prisma.auditLog.create({
        data: {
          firmId,
          userId: 'SYSTEM',
          action: 'HALLUCINATION_REJECTED',
          metadata: r.finding,
          ipAddress: '127.0.0.1',
          rejectedFinding: r.finding,
          rejectionReason: r.reason
        }
      });
    }
    
    const isFailed = stage3.rejected.length > 0 && (stage3.rejected.length / (stage3.passed.length + stage3.rejected.length) > 0.5);
    
    const criticalCount = stage3.passed.filter(f => f.severity === 'CRITICAL').length;
    const warningCount = stage3.passed.filter(f => f.severity === 'WARNING').length;
    const noticeCount = stage3.passed.filter(f => f.severity === 'NOTICE').length;
    
    if (isFailed) {
      await prisma.report.update({
        where: { id: reportId },
        data: { status: 'FAILED' }
      });
      pushEvent('scan_failed', { error: 'High hallucination rate detected', reportId });
      const report = await prisma.report.findUnique({ where: { id: reportId }, include: { firm: { include: { users: { where: { role: 'ADMIN' } } } } } });
      if (report && report.firm.users.length > 0) {
        await sendEmail({
          to: report.firm.users[0].email,
          subject: 'Report Failed: Manual Review Required',
          html: '<p>More than 50% of the findings were rejected during verification.</p>'
        });
      }
    } else {
      await prisma.report.update({
        where: { id: reportId },
        data: {
          status: 'COMPLETE',
          totalIssues: stage3.passed.length,
          criticalCount,
          warningCount,
          noticeCount
        }
      });
      pushEvent('scan_complete', { reportId, criticalCount, warningCount, noticeCount });
      const report = await prisma.report.findUnique({ where: { id: reportId }, include: { createdBy: true, client: true } });
      if (report && report.createdBy.email) {
        await sendEmail({
          to: report.createdBy.email,
          subject: 'Scan Complete',
          html: `<p>Report for ${report.client.name} is ready.</p>`
        });
      }
    }
    
  } catch (err: any) {
    await prisma.report.update({ where: { id: reportId }, data: { status: 'FAILED' } });
    pushEvent('scan_failed', { error: err.message, reportId });
  }
}
