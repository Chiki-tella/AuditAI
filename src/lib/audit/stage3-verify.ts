import { z } from 'zod';
import { Transaction } from './stage1-deterministic';

export const ClaudeOutputSchema = z.object({
  findings: z.array(z.object({
    transactionRef: z.string(),
    vendor: z.string(),
    amount: z.number(),
    date: z.string(),
    severity: z.enum(['CRITICAL', 'WARNING', 'NOTICE']),
    title: z.string(),
    description: z.string(),
    recommendedAction: z.string()
  }))
});

export type ClaudeFinding = z.infer<typeof ClaudeOutputSchema>['findings'][0];

export type VerifiedResult = {
  passed: ClaudeFinding[];
  rejected: { finding: ClaudeFinding, reason: string }[];
};

export async function runStage3(transactions: Transaction[], claudeOutputStr: string): Promise<VerifiedResult> {
  let parsed;
  try {
    parsed = JSON.parse(claudeOutputStr);
  } catch (e) {
    return { passed: [], rejected: [] };
  }
  
  const validation = ClaudeOutputSchema.safeParse(parsed);
  if (!validation.success) {
    return { passed: [], rejected: [] };
  }
  
  const findings = validation.data.findings;
  
  const index = new Map<string, Transaction>();
  for (const t of transactions) {
    index.set(t.rowRef, t);
  }
  
  const passed: ClaudeFinding[] = [];
  const rejected: { finding: ClaudeFinding, reason: string }[] = [];
  
  for (const finding of findings) {
    const t = index.get(finding.transactionRef);
    if (!t) {
      rejected.push({ finding, reason: 'Transaction reference not found in original dataset' });
      continue;
    }
    
    if (t.amount !== finding.amount) {
      rejected.push({ finding, reason: `Amount mismatch. Source: ${t.amount}, AI: ${finding.amount}` });
      continue;
    }
    
    if (t.vendor !== finding.vendor) {
      rejected.push({ finding, reason: `Vendor mismatch. Source: ${t.vendor}, AI: ${finding.vendor}` });
      continue;
    }
    
    passed.push(finding);
  }
  
  return { passed, rejected };
}
