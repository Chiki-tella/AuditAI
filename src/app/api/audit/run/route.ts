import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { auth } from '@/lib/auth/session';
import { runAuditEngine } from '@/lib/audit/engine';

const RunSchema = z.object({
  clientId: z.string(),
  period: z.string(),
  transactions: z.array(z.object({
    rowRef: z.string(),
    date: z.string(),
    vendor: z.string(),
    amount: z.number(),
    category: z.string(),
    description: z.string()
  }))
});

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user || (session.user as any).role === 'JUNIOR') {
      return NextResponse.json({ error: "Forbidden", code: "FORBIDDEN" }, { status: 403 });
    }

    const body = await req.json();
    const parsed = RunSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", code: "INVALID_INPUT" }, { status: 400 });
    }
    
    const { clientId, period, transactions } = parsed.data;
    
    if (transactions.length === 0 || transactions.length > 10000) {
      return NextResponse.json({ error: "Transactions must be between 1 and 10,000", code: "INVALID_TRANSACTIONS_COUNT" }, { status: 400 });
    }
    
    const firmId = (session.user as any).firmId;
    const firm = await prisma.firm.findUnique({
      where: { id: firmId },
      include: { subscription: true }
    });
    
    if (!firm) return NextResponse.json({ error: "Firm not found", code: "NOT_FOUND" }, { status: 404 });
    
    const hasActiveSub = firm.subscription?.status === 'ACTIVE';
    if (firm.scansUsed >= firm.scansLimit && !hasActiveSub) {
      return NextResponse.json({ error: "Scan quota exceeded", code: "QUOTA_EXCEEDED" }, { status: 402 });
    }
    
    await prisma.firm.update({
      where: { id: firmId },
      data: { scansUsed: { increment: 1 } }
    });
    
    const report = await prisma.report.create({
      data: {
        clientId,
        firmId,
        createdById: session.user.id as string,
        period,
        status: 'PROCESSING',
        totalIssues: 0,
        criticalCount: 0,
        warningCount: 0,
        noticeCount: 0,
        promptVersionHash: ''
      }
    });

    await prisma.auditLog.create({
      data: {
        firmId,
        userId: session.user.id as string,
        action: 'INITIATE_SCAN',
        metadata: { reportId: report.id },
        ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1'
      }
    });
    
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();
    const encoder = new TextEncoder();
    
    const pushEvent = (event: string, data: any) => {
      writer.write(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`));
    };
    
    runAuditEngine(report.id, clientId, firmId, transactions, pushEvent)
      .finally(() => writer.close());
    
    return new NextResponse(stream.readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    return NextResponse.json({ error: "Internal server error", code: "INTERNAL_ERROR" }, { status: 500 });
  }
}
