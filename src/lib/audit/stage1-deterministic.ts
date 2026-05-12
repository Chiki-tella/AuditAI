export type Transaction = {
  rowRef: string;
  date: string;
  vendor: string;
  amount: number;
  category: string;
  description: string;
};

export type AnomalyFlag = {
  rowRef: string;
  anomalyType: string;
  triggeredValue: string;
  severity: 'CRITICAL' | 'WARNING' | 'NOTICE';
  rowIndex: number;
};

export async function runStage1(transactions: Transaction[], onProgress?: (msg: string, rows: number) => void): Promise<AnomalyFlag[]> {
  const flags: AnomalyFlag[] = [];
  
  if (transactions.length === 0) return flags;
  
  const vendorStats = new Map<string, { count: number, mean: number, m2: number }>();
  const dupMap = new Map<string, number[]>();

  for (let i = 0; i < transactions.length; i++) {
    const t = transactions[i];
    
    if (onProgress && i > 0 && i % 1000 === 0) {
      onProgress(`Stage 1: Scanning ${i} rows...`, i);
    }
    
    if (!t.date || !t.vendor || t.amount == null || isNaN(t.amount)) {
      flags.push({ rowRef: t.rowRef, anomalyType: 'MISSING_FIELD', triggeredValue: JSON.stringify(t), severity: 'CRITICAL', rowIndex: i });
      continue;
    }
    
    const amountStr = t.amount.toString();
    const isRoundSum = Number.isInteger(t.amount) && t.amount % 100 === 0 && t.amount !== 0;
    
    if (isRoundSum) {
      flags.push({ rowRef: t.rowRef, anomalyType: 'ROUND_SUM', triggeredValue: amountStr, severity: 'NOTICE', rowIndex: i });
    }
    
    const cat = t.category?.toLowerCase() || '';
    const isIncome = cat.includes('income') || cat.includes('revenue');
    const isExpense = cat.includes('expense') || cat.includes('cost');
    if (isIncome && t.amount < 0) {
      flags.push({ rowRef: t.rowRef, anomalyType: 'SIGN_ANOMALY', triggeredValue: amountStr, severity: 'WARNING', rowIndex: i });
    } else if (isExpense && t.amount > 0) {
      flags.push({ rowRef: t.rowRef, anomalyType: 'SIGN_ANOMALY', triggeredValue: amountStr, severity: 'WARNING', rowIndex: i });
    }
    
    const tDate = new Date(t.date).getTime();
    if (!isNaN(tDate)) {
      const baseKey = `${t.vendor.toLowerCase()}_${t.amount}`;
      if (!dupMap.has(baseKey)) {
        dupMap.set(baseKey, [i]);
      } else {
        const matches = dupMap.get(baseKey)!;
        for (const matchIdx of matches) {
          const matchDate = new Date(transactions[matchIdx].date).getTime();
          if (Math.abs(tDate - matchDate) <= 2 * 24 * 60 * 60 * 1000) {
            flags.push({ rowRef: t.rowRef, anomalyType: 'DUPLICATE', triggeredValue: amountStr, severity: 'WARNING', rowIndex: i });
            break;
          }
        }
        matches.push(i);
      }
    }
    
    const vKey = t.vendor.toLowerCase();
    const v = vendorStats.get(vKey) || { count: 0, mean: 0, m2: 0 };
    v.count += 1;
    const delta = t.amount - v.mean;
    v.mean += delta / v.count;
    const delta2 = t.amount - v.mean;
    v.m2 += delta * delta2;
    vendorStats.set(vKey, v);
  }
  
  for (let i = 0; i < transactions.length; i++) {
    const t = transactions[i];
    if (t.amount == null || isNaN(t.amount) || !t.vendor) continue;
    const vKey = t.vendor.toLowerCase();
    const v = vendorStats.get(vKey);
    if (v && v.count > 2) {
      const variance = v.m2 / (v.count - 1);
      const stddev = Math.sqrt(variance);
      if (stddev > 0 && Math.abs(t.amount - v.mean) > 3 * stddev) {
        flags.push({ rowRef: t.rowRef, anomalyType: 'OUTLIER', triggeredValue: t.amount.toString(), severity: 'WARNING', rowIndex: i });
      }
    }
  }

  for (let i = 1; i < transactions.length; i++) {
    const prevRef = parseInt(transactions[i - 1].rowRef, 10);
    const currRef = parseInt(transactions[i].rowRef, 10);
    if (!isNaN(prevRef) && !isNaN(currRef) && currRef === prevRef + 1) {
      // Logic for sequential IDs with anomalies if required
    }
  }

  return flags;
}
