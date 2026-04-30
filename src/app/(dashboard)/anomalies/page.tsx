"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Check, X, MessageSquare, ArrowRight, Info } from "lucide-react";

const anomalies = [
  {
    id: "ANM-804",
    client: "Wayne Enterprises",
    date: "Apr 27, 2026",
    transaction: "Office Supplies",
    amount: "$450.00",
    confidence: "98%",
    issue: "Duplicate Entry Detected",
    reasoning: "A transaction with the exact same amount, vendor, and date was already cleared under TXN-089. This appears to be a double-entry.",
    severity: "high"
  },
  {
    id: "ANM-805",
    client: "Stark Industries",
    date: "Apr 25, 2026",
    transaction: "Wire Transfer - Unknown",
    amount: "$50,000.00",
    confidence: "95%",
    issue: "Uncategorized Large Transfer",
    reasoning: "Vendor 'Stark Tech R&D' is not recognized in past transactions. Due to the high amount, manual categorization and review are required.",
    severity: "high"
  },
  {
    id: "ANM-806",
    client: "Acme Corp",
    date: "Apr 22, 2026",
    transaction: "Team Lunch - Pizza",
    amount: "$1,200.00",
    confidence: "82%",
    issue: "Unusual Expense Spike",
    reasoning: "The average 'Meals & Entertainment' expense for this client is $150. This transaction exceeds the historical average by 800%.",
    severity: "medium"
  }
];

export default function AnomaliesPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight font-heading flex items-center gap-3">
            Anomalies
            <span className="bg-rose-500/20 text-rose-400 text-sm py-1 px-3 rounded-full font-bold flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" /> 12 Action Required
            </span>
          </h1>
          <p className="text-slate-400 mt-2">Transactions flagged by AuditAI that require your expertise.</p>
        </div>
        
        <div className="flex gap-2">
          <select className="bg-slate-900/50 border border-slate-700 text-slate-300 text-sm rounded-lg px-3 py-2 outline-none focus:border-primary">
            <option>All Clients</option>
            <option>Wayne Enterprises</option>
            <option>Stark Industries</option>
          </select>
          <select className="bg-slate-900/50 border border-slate-700 text-slate-300 text-sm rounded-lg px-3 py-2 outline-none focus:border-primary">
            <option>High Severity First</option>
            <option>Newest First</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6">
        {anomalies.map((anomaly, index) => (
          <motion.div
            key={anomaly.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#0f172a]/60 backdrop-blur-md border border-slate-800/80 rounded-2xl overflow-hidden flex flex-col md:flex-row"
          >
            {/* Left Info Panel */}
            <div className="p-6 md:w-1/3 border-b md:border-b-0 md:border-r border-slate-800/80 bg-slate-900/20">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-4">
                <span>{anomaly.id}</span>
                <span>•</span>
                <span>{anomaly.date}</span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-1">{anomaly.amount}</h3>
              <p className="text-slate-300 font-medium mb-1">{anomaly.transaction}</p>
              <p className="text-sm text-primary mb-6">{anomaly.client}</p>
              
              <div className="pt-4 border-t border-slate-800/80">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">AI Confidence:</span>
                  <span className="text-emerald-400 font-bold">{anomaly.confidence}</span>
                </div>
              </div>
            </div>

            {/* Right Action Panel */}
            <div className="p-6 md:w-2/3 flex flex-col">
              <div className="flex items-start gap-4 mb-4">
                <div className={`mt-1 p-2 rounded-lg ${anomaly.severity === 'high' ? 'bg-rose-500/10 text-rose-500' : 'bg-amber-500/10 text-amber-500'}`}>
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">{anomaly.issue}</h4>
                  <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                    {anomaly.reasoning}
                  </p>
                </div>
              </div>

              <div className="mt-auto pt-6 flex flex-wrap gap-3">
                <button className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-xl transition-colors font-medium text-sm">
                  <Check className="w-4 h-4" /> Approve & Clear
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 border border-rose-500/20 rounded-xl transition-colors font-medium text-sm">
                  <X className="w-4 h-4" /> Reject Entry
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700 rounded-xl transition-colors font-medium text-sm">
                  <MessageSquare className="w-4 h-4" /> Request Info from Client
                </button>
                <button className="ml-auto flex items-center gap-2 px-4 py-2.5 text-primary hover:text-primary-dark transition-colors font-medium text-sm">
                  View Full Ledger <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="flex justify-center pt-4">
        <button className="px-6 py-3 border border-slate-700 text-slate-300 rounded-full hover:bg-slate-800 hover:text-white transition-all text-sm font-medium">
          Load More Anomalies
        </button>
      </div>
    </div>
  );
}
