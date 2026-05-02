"use client";

import { motion } from "framer-motion";
import { Search, Filter, Download, MoreHorizontal, CheckCircle2, AlertCircle, Clock } from "lucide-react";

const transactions = [
  { id: "TXN-092", date: "Apr 28, 2026", client: "Stark Industries", desc: "Server Hosting AWS", amount: "$4,250.00", category: "Software", status: "cleared" },
  { id: "TXN-093", date: "Apr 28, 2026", client: "Wayne Enterprises", desc: "Consulting Retainer", amount: "$15,000.00", category: "Income", status: "pending" },
  { id: "TXN-094", date: "Apr 27, 2026", client: "Wayne Enterprises", desc: "Office Supplies - Duplicate", amount: "$450.00", category: "Expense", status: "flagged" },
  { id: "TXN-095", date: "Apr 26, 2026", client: "Acme Corp", desc: "Marketing Ads Q2", amount: "$12,400.00", category: "Marketing", status: "cleared" },
  { id: "TXN-096", date: "Apr 26, 2026", client: "Globex", desc: "Travel Expenses", amount: "$1,250.00", category: "Travel", status: "cleared" },
  { id: "TXN-097", date: "Apr 25, 2026", client: "Stark Industries", desc: "Uncategorized Wire", amount: "$50,000.00", category: "Unknown", status: "flagged" },
  { id: "TXN-098", date: "Apr 25, 2026", client: "Acme Corp", desc: "Legal Fees", amount: "$3,500.00", category: "Legal", status: "cleared" },
];

export default function TransactionsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight font-heading">Transactions</h1>
          <p className="text-slate-400 mt-1">Review AI-processed transactions across your firm's clients.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2.5 bg-slate-900/50 border border-slate-700 hover:bg-slate-800 text-slate-300 font-medium rounded-xl transition-colors text-sm flex items-center gap-2">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      <div className="bg-[#0f172a]/60 backdrop-blur-md border border-slate-800/80 rounded-2xl overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search description, ID..." 
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-2 pl-9 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
              />
            </div>
            <button className="p-2 border border-slate-700 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-slate-400 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
            <span className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg font-medium whitespace-nowrap cursor-pointer">All</span>
            <span className="px-3 py-1.5 hover:bg-slate-800 rounded-lg cursor-pointer transition-colors whitespace-nowrap">Flagged (2)</span>
            <span className="px-3 py-1.5 hover:bg-slate-800 rounded-lg cursor-pointer transition-colors whitespace-nowrap">Pending (1)</span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="text-xs uppercase bg-slate-900/50 border-b border-slate-800/80 text-slate-500">
              <tr>
                <th className="px-6 py-4 font-medium">Transaction ID</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Client</th>
                <th className="px-6 py-4 font-medium">Description</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">AI Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {transactions.map((txn, idx) => (
                <motion.tr 
                  key={txn.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                >
                  <td className="px-6 py-4 font-medium text-slate-400 group-hover:text-white transition-colors">{txn.id}</td>
                  <td className="px-6 py-4">{txn.date}</td>
                  <td className="px-6 py-4 text-primary group-hover:text-primary-dark transition-colors">{txn.client}</td>
                  <td className="px-6 py-4 text-white">
                    {txn.desc}
                    <div className="text-xs text-slate-500 mt-1">{txn.category}</div>
                  </td>
                  <td className="px-6 py-4 font-mono">{txn.amount}</td>
                  <td className="px-6 py-4">
                    {txn.status === "cleared" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-900/50 text-slate-500 border border-slate-800/80">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Cleared
                      </span>
                    )}
                    {txn.status === "flagged" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30 shadow-[0_0_10px_rgba(14,165,233,0.1)]">
                        <AlertCircle className="w-3.5 h-3.5" /> Flagged
                      </span>
                    )}
                    {txn.status === "pending" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800/50 text-slate-400 border border-slate-700/50">
                        <Clock className="w-3.5 h-3.5" /> Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100 p-1">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-slate-800/80 flex items-center justify-between text-sm text-slate-400">
          <span>Showing 1 to 7 of 142 entries</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 hover:text-white transition-colors">Previous</button>
            <button className="px-3 py-1 bg-slate-800 text-white rounded transition-colors">1</button>
            <button className="px-3 py-1 hover:text-white transition-colors">2</button>
            <button className="px-3 py-1 hover:text-white transition-colors">3</button>
            <button className="px-3 py-1 hover:text-white transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
