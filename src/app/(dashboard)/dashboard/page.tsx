"use client";

import { motion } from "framer-motion";
import { 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  FileSearch, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight,
  Filter,
  Download,
  Search,
  MoreVertical,
  Activity,
  History
} from "lucide-react";

const stats = [
  { 
    label: "Transactions Scanned", 
    value: "1,284,502", 
    change: "+12.5%", 
    trend: "up", 
    icon: Activity,
    color: "text-blue-400" 
  },
  { 
    label: "Anomalies Flagged", 
    value: "2,481", 
    change: "-2.4%", 
    trend: "down", 
    icon: AlertTriangle,
    color: "text-amber-400" 
  },
  { 
    label: "Critical Issues", 
    value: "12", 
    change: "+1", 
    trend: "up", 
    icon: FileSearch,
    color: "text-rose-400" 
  },
  { 
    label: "Active Clients", 
    value: "148", 
    change: "+4", 
    trend: "up", 
    icon: Users,
    color: "text-emerald-400" 
  },
];

const recentAnomalies = [
  { id: "TX-9021", client: "Global Tech Solutions", amount: "$12,400.00", type: "Duplicate Transaction", risk: "High", status: "Pending" },
  { id: "TX-8942", client: "Nexus Media Group", amount: "$450.50", type: "Vendor Mismatch", risk: "Medium", status: "Reviewing" },
  { id: "TX-8810", client: "Quantum Dynamics", amount: "$8,920.00", type: "Unusual Volume", risk: "High", status: "Pending" },
  { id: "TX-8756", client: "Aero Logistics", amount: "$1,200.00", type: "Out-of-Pattern Expense", risk: "Low", status: "Resolved" },
  { id: "TX-8621", client: "Starlight Retail", amount: "$3,400.00", type: "Duplicate Transaction", risk: "Medium", status: "Pending" },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold text-white tracking-tight font-heading"
          >
            Audit Intelligence Overview
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.1 }}
            className="text-slate-400 mt-1"
          >
            Real-time monitoring across your professional portfolio.
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
            <Filter className="w-4 h-4 text-slate-400" />
            Filter View
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-slate-950 rounded-lg text-sm font-bold hover:bg-primary-dark transition-all shadow-[0_0_15px_rgba(14,165,233,0.3)]">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx }}
            className="bg-[#0f172a]/60 backdrop-blur-sm border border-slate-800/60 p-6 rounded-2xl relative overflow-hidden group hover:border-slate-700/80 transition-all"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">{stat.label}</p>
                <h3 className="text-2xl font-bold text-white tracking-tight">{stat.value}</h3>
              </div>
              <div className={`p-2.5 rounded-xl bg-slate-800/50 ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <div className={`flex items-center gap-0.5 text-xs font-bold px-1.5 py-0.5 rounded ${
                stat.trend === "up" ? "text-emerald-400 bg-emerald-400/10" : "text-rose-400 bg-rose-400/10"
              }`}>
                {stat.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </div>
              <span className="text-slate-500 text-[11px] font-medium italic">vs last month</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Chart Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-8 bg-[#0f172a]/60 backdrop-blur-sm border border-slate-800/60 rounded-2xl p-6 overflow-hidden"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-white">Audit Processing Activity</h3>
              <p className="text-sm text-slate-500">Transaction scanning volume across all clients</p>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/50 p-1 rounded-lg border border-slate-800">
              {["7D", "30D", "90D"].map(range => (
                <button key={range} className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${range === "30D" ? "bg-slate-800 text-white" : "text-slate-500 hover:text-slate-300"}`}>
                  {range}
                </button>
              ))}
            </div>
          </div>

          <div className="h-64 w-full relative flex items-end gap-1.5 pb-2">
            {/* Minimalist Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pt-2 pb-6 pointer-events-none opacity-20">
              {[1, 2, 3, 4].map(i => <div key={i} className="w-full h-[1px] bg-slate-700" />)}
            </div>

            {/* Bars */}
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="flex-1 group relative flex flex-col justify-end">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.random() * 60 + 20}%` }}
                  transition={{ delay: 0.5 + (i * 0.02), duration: 0.8 }}
                  className={`w-full rounded-t-sm transition-all group-hover:opacity-100 ${i === 18 ? "bg-primary opacity-100 shadow-[0_0_15px_rgba(14,165,233,0.4)]" : "bg-slate-800 opacity-60"}`}
                />
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-[10px] text-white px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {Math.floor(Math.random() * 50 + 50)}k
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-[10px] text-slate-600 font-bold uppercase tracking-widest">
            <span>01 May</span>
            <span>08 May</span>
            <span>15 May</span>
            <span>22 May</span>
            <span>30 May</span>
          </div>
        </motion.div>

        {/* Action Center / Quick Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-4 space-y-6"
        >
          <div className="bg-gradient-to-br from-slate-900 to-blue-950/40 border border-blue-900/30 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/10 blur-3xl rounded-full" />
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              Efficiency Score
            </h3>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-20 h-20 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="40" cy="40" r="36" fill="none" stroke="currentColor" strokeWidth="6" className="text-slate-800" />
                  <circle cx="40" cy="40" r="36" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray="226" strokeDashoffset="18" className="text-primary" />
                </svg>
                <span className="absolute text-xl font-bold text-white">92%</span>
              </div>
              <div>
                <p className="text-sm text-slate-300 font-medium">Top Performer</p>
                <p className="text-xs text-slate-500 mt-1">Audit automation has saved 124 hours this month.</p>
              </div>
            </div>
            <button className="w-full py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-white hover:bg-white/10 transition-all">
              View Audit History
            </button>
          </div>

          <div className="bg-[#0f172a]/60 border border-slate-800/60 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
              <History className="w-4 h-4 text-slate-400" />
              Recent Actions
            </h3>
            <div className="space-y-4">
              {[
                { label: "Report Generated", time: "2h ago", client: "Nexus Media" },
                { label: "New Data Sync", time: "5h ago", client: "Global Tech" },
                { label: "Anomaly Resolved", time: "1d ago", client: "Aero Log" }
              ].map((action, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div>
                    <p className="text-sm font-medium text-slate-300 group-hover:text-primary transition-colors">{action.label}</p>
                    <p className="text-[10px] text-slate-500">{action.client}</p>
                  </div>
                  <span className="text-[10px] font-bold text-slate-600">{action.time}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Anomaly Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-[#0f172a]/60 backdrop-blur-sm border border-slate-800/60 rounded-2xl overflow-hidden"
      >
        <div className="p-6 border-b border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white">Recent AI Flags</h3>
            <p className="text-sm text-slate-500">High-risk transactions requiring manual review</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search flags..." 
                className="bg-slate-900/50 border border-slate-800 rounded-lg py-1.5 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-primary/50 transition-all"
              />
            </div>
            <button className="p-2 bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800 text-slate-400">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/30 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4 text-right">Amount</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Risk Level</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {recentAnomalies.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-800/20 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-white group-hover:text-primary transition-colors">{tx.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-300">{tx.client}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-bold text-white font-mono">{tx.amount}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-slate-400">{tx.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      tx.risk === "High" ? "bg-rose-400/10 text-rose-400" : 
                      tx.risk === "Medium" ? "bg-amber-400/10 text-amber-400" : "bg-emerald-400/10 text-emerald-400"
                    }`}>
                      {tx.risk}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[11px] font-medium ${tx.status === "Resolved" ? "text-slate-500" : "text-blue-400"}`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-500 hover:text-white transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 bg-slate-900/20 border-t border-slate-800/60 flex items-center justify-center">
          <button className="text-xs font-bold text-primary hover:text-primary-dark transition-colors uppercase tracking-widest flex items-center gap-2">
            View All Transactions
            <TrendingUp className="w-3 h-3" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}


