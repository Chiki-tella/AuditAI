import { Transaction, AnomalyFlag } from './stage1-deterministic';
import crypto from 'crypto';

export type Stage2Result = {
  payloadTokens: number;
  systemPrompt: string;
  promptHash: string;
  payload: string;
};

export async function runStage2(transactions: Transaction[], flags: AnomalyFlag[]): Promise<Stage2Result> {
  const contextRows = new Set<number>();
  
  let windowSize = 5;
  if (flags.length * 11 * 20 > 2000) {
    windowSize = 3;
  }
  
  for (const flag of flags) {
    for (let i = Math.max(0, flag.rowIndex - windowSize); i <= Math.min(transactions.length - 1, flag.rowIndex + windowSize); i++) {
      contextRows.add(i);
    }
  }
  
  const sortedIndices = Array.from(contextRows).sort((a, b) => a - b);
  
  const payloadData = sortedIndices.map(idx => {
    const t = transactions[idx];
    const item: any = {
      rowRef: t.rowRef,
      date: t.date,
      amount: t.amount,
      category: t.category,
      vendor: t.vendor
    };
    if (windowSize === 5) {
      item.description = t.description;
    }
    return item;
  });

  const payloadString = JSON.stringify(payloadData);
  const payloadTokens = Math.ceil(payloadString.length / 4);
  
  const systemPrompt = `You are an expert AI auditor. Analyze the provided financial transactions. Return ONLY JSON.
Schema:
{
  "findings": [{
    "transactionRef": "string",
    "vendor": "string",
    "amount": 0,
    "date": "string",
    "severity": "CRITICAL" | "WARNING" | "NOTICE",
    "title": "string",
    "description": "string",
    "recommendedAction": "string"
  }]
}
Pre-flagged anomalies:
${JSON.stringify(flags.map(f => ({ row: f.rowRef, type: f.anomalyType })))}
`;

  const promptHash = crypto.createHash('sha256').update(systemPrompt).digest('hex');

  return {
    payloadTokens,
    systemPrompt,
    promptHash,
    payload: payloadString
  };
}
