"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Clock, FileText, AlertTriangle, Users, Activity } from "lucide-react";

const stats = [
  { name: "Total Audits Processed", value: "2,845", change: "+12.5%", trend: "up", icon: FileText },
  { name: "High-Risk Anomalies", value: "24", change: "-4.2%", trend: "down", icon: AlertTriangle, color: "text-red-400", bgColor: "bg-red-400/10" },
  { name: "Active Clients", value: "142", change: "+8.1%", trend: "up", icon: Users },
  { name: "Avg Processing Time", value: "1.2s", change: "-15.3%", trend: "down", icon: Clock },
];

const recentActivity = [
  { id: 1, action: "Deep scan completed", target: "Stark Industries", time: "2 mins ago", status: "success" },
  { id: 2, action: "Anomaly detected: Duplicate Invoice", target: "Wayne Enterprises", time: "15 mins ago", status: "warning" },
  { id: 3, action: "Monthly report generated", target: "Acme Corp", time: "1 hour ago", status: "info" },
  { id: 4, action: "New data synced", target: "Globex", time: "3 hours ago", status: "success" },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight font-heading">Firm Overview</h1>
          <p className="text-slate-400 mt-1">Here's what's happening with your clients' bookkeeping today.</p>
        </div>
        <button className="px-5 py-2.5 bg-primary text-slate-950 font-semibold rounded-xl hover:bg-primary-dark transition-colors text-sm">
          Run Global Scan
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-[#0f172a]/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <stat.icon className={`w-16 h-16 ${stat.color || "text-primary"}`} />
            </div>
            <div className="relative z-10">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${stat.bgColor || "bg-primary/10"}`}>
                <stat.icon className={`w-5 h-5 ${stat.color || "text-primary"}`} />
              </div>
              <p className="text-sm font-medium text-slate-400">{stat.name}</p>
              <div className="flex items-end gap-3 mt-1">
                <span className="text-3xl font-bold text-white">{stat.value}</span>
                <span className={`flex items-center text-xs font-medium mb-1.5 ${stat.trend === "up" ? (stat.name === "Avg Processing Time" || stat.name === "High-Risk Anomalies" ? "text-red-400" : "text-emerald-400") : (stat.name === "Avg Processing Time" || stat.name === "High-Risk Anomalies" ? "text-emerald-400" : "text-red-400")}`}>
                  {stat.trend === "up" ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                  {stat.change}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Area (Mocked) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="lg:col-span-2 bg-[#0f172a]/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 flex flex-col"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-semibold text-white">Scan Volume</h2>
            <select className="bg-slate-900/50 border border-slate-700 text-slate-300 text-sm rounded-lg px-3 py-1.5 outline-none focus:border-primary">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Year</option>
            </select>
          </div>
          
          <div className="flex-1 min-h-[250px] flex items-end justify-between gap-2 md:gap-4 mt-auto">
            {[40, 65, 45, 80, 55, 95, 70, 85, 60, 100, 75, 90].map((h, i) => (
              <div key={i} className="w-full relative group h-full flex items-end">
                <div 
                  className="w-full rounded-t-sm bg-gradient-to-t from-primary/10 via-primary/40 to-primary/80 transition-all duration-300 group-hover:brightness-125 group-hover:from-primary/20" 
                  style={{ height: `${h}%` }}
                />
                {/* Tooltip on hover */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  {h * 12} Scans
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-[#0f172a]/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">AI Activity</h2>
            <button className="text-primary hover:text-white transition-colors text-sm font-medium">View All</button>
          </div>
          
          <div className="space-y-6">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex gap-4">
                <div className="mt-1">
                  <div className={`w-2 h-2 rounded-full mt-1.5 ${
                    activity.status === 'success' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]' : 
                    activity.status === 'warning' ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]' : 
                    'bg-primary shadow-[0_0_8px_rgba(56,189,248,0.5)]'
                  }`} />
                </div>
                <div>
                  <p className="text-sm text-slate-200">{activity.action}</p>
                  <p className="text-xs text-slate-500 mt-1">{activity.target} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-slate-800/80">
            <div className="flex items-center justify-between p-4 bg-primary/5 rounded-xl border border-primary/10">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-primary animate-pulse" />
                <span className="text-sm text-primary font-medium">System is running normally</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
