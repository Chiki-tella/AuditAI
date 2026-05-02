"use client";

import { motion } from "framer-motion";
import { Plus, Search, Building2, Activity, ArrowRight, MoreVertical } from "lucide-react";

const clients = [
  {
    id: "CL-01",
    name: "Wayne Enterprises",
    industry: "Conglomerate",
    status: "Healthy",
    healthScore: 98,
    unresolvedAnomalies: 2,
    lastSync: "10 mins ago",
    monthlyVolume: "$2.4M",
    logoGradient: "from-slate-700 to-slate-900"
  },
  {
    id: "CL-02",
    name: "Stark Industries",
    industry: "Technology",
    status: "Attention Needed",
    healthScore: 85,
    unresolvedAnomalies: 8,
    lastSync: "1 hour ago",
    monthlyVolume: "$18.5M",
    logoGradient: "from-blue-700 to-slate-900"
  },
  {
    id: "CL-03",
    name: "Acme Corp",
    industry: "Manufacturing",
    status: "Healthy",
    healthScore: 95,
    unresolvedAnomalies: 0,
    lastSync: "3 hours ago",
    monthlyVolume: "$850K",
    logoGradient: "from-emerald-700 to-slate-900"
  },
  {
    id: "CL-04",
    name: "Globex Corporation",
    industry: "Energy",
    status: "Healthy",
    healthScore: 92,
    unresolvedAnomalies: 1,
    lastSync: "1 day ago",
    monthlyVolume: "$4.2M",
    logoGradient: "from-purple-700 to-slate-900"
  },
  {
    id: "CL-05",
    name: "Soylent Corp",
    industry: "Food & Beverage",
    status: "Critical",
    healthScore: 65,
    unresolvedAnomalies: 15,
    lastSync: "2 days ago",
    monthlyVolume: "$1.1M",
    logoGradient: "from-amber-700 to-slate-900"
  },
  {
    id: "CL-06",
    name: "Initech",
    industry: "Software",
    status: "Healthy",
    healthScore: 99,
    unresolvedAnomalies: 0,
    lastSync: "Just now",
    monthlyVolume: "$320K",
    logoGradient: "from-sky-700 to-slate-900"
  }
];

export default function ClientsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight font-heading">Clients</h1>
          <p className="text-slate-400 mt-1">Manage the firms you are auditing and monitor their bookkeeping health.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative hidden sm:block w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search clients..." 
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-2.5 pl-9 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
            />
          </div>
          <button className="px-4 py-2.5 bg-primary text-slate-950 font-semibold rounded-xl hover:bg-primary-dark transition-colors text-sm flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Client
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client, index) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="bg-[#0f172a]/60 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 hover:border-slate-700 transition-all group flex flex-col"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${client.logoGradient} flex items-center justify-center shadow-lg`}>
                  <Building2 className="w-6 h-6 text-white/80" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{client.name}</h3>
                  <p className="text-xs text-slate-400">{client.industry}</p>
                </div>
              </div>
              <button className="text-slate-500 hover:text-white transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-800/50">
                <p className="text-xs text-slate-500 mb-1">Health Score</p>
                <div className="flex items-center gap-2">
                  <span className={`text-xl font-bold ${
                    client.healthScore >= 90 ? 'text-primary' : 
                    client.healthScore >= 70 ? 'text-primary/70' : 'text-slate-400'
                  }`}>
                    {client.healthScore}
                  </span>
                  <span className="text-xs text-slate-400">/100</span>
                </div>
              </div>
              <div className={`rounded-xl p-3 border ${
                client.unresolvedAnomalies > 5 ? 'bg-primary/10 border-primary/20' : 
                client.unresolvedAnomalies > 0 ? 'bg-slate-800/50 border-slate-700/50' : 
                'bg-slate-900/50 border-slate-800/50'
              }`}>
                <p className="text-xs text-slate-500 mb-1">Anomalies</p>
                <span className={`text-xl font-bold ${
                  client.unresolvedAnomalies > 5 ? 'text-primary' : 
                  client.unresolvedAnomalies > 0 ? 'text-slate-300' : 'text-slate-500'
                }`}>
                  {client.unresolvedAnomalies}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800/80">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Activity className="w-3.5 h-3.5" /> Synced {client.lastSync}
              </div>
              <button className="text-sm font-medium text-primary hover:text-primary-dark transition-colors flex items-center gap-1">
                View Details <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
