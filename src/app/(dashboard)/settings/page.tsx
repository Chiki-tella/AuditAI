"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Building2, 
  ShieldCheck, 
  BellRing, 
  CreditCard, 
  Mail, 
  Save,
  ChevronRight,
  ExternalLink
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", label: "General", icon: User },
    { id: "firm", label: "Firm Details", icon: Building2 },
    { id: "security", label: "Security", icon: ShieldCheck },
    { id: "notifications", label: "Notifications", icon: BellRing },
    { id: "billing", label: "Billing", icon: CreditCard },
  ];

  return (
    <div className="max-w-5xl">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white tracking-tight">System Settings</h1>
        <p className="text-slate-400 mt-1">Manage your account, firm preferences, and security protocols.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs */}
        <aside className="w-full lg:w-64 shrink-0">
          <nav className="flex lg:flex-col gap-1 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(14,165,233,0.1)]"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 bg-[#0f172a]/60 backdrop-blur-sm border border-slate-800/60 rounded-2xl p-6 lg:p-8">
          {activeTab === "general" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300">Full Name</label>
                  <input 
                    type="text" 
                    defaultValue="Jane Doe"
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300">Email Address</label>
                  <input 
                    type="email" 
                    defaultValue="jane@accountingfirm.com"
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-all"
                  />
                </div>
              </div>
              
              <div className="pt-6 border-t border-slate-800/60 flex justify-end">
                <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-slate-950 rounded-xl text-sm font-bold hover:bg-primary-dark transition-all">
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === "firm" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-300">Firm Name</label>
                  <input 
                    type="text" 
                    defaultValue="Doe & Associates CPAs"
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-all"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-300">Firm ID</label>
                    <input type="text" readOnly value="AUDIT-99281-X" className="w-full bg-slate-800/30 border border-slate-800 rounded-xl px-4 py-3 text-slate-500 cursor-not-allowed" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-300">Primary Industry</label>
                    <select className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-all">
                      <option>B2B Software</option>
                      <option>Retail</option>
                      <option>Manufacturing</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="pt-6 border-t border-slate-800/60 flex justify-end">
                <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-slate-950 rounded-xl text-sm font-bold hover:bg-primary-dark transition-all">
                  <Save className="w-4 h-4" />
                  Update Firm
                </button>
              </div>
            </motion.div>
          )}

          {/* Placeholder for other tabs */}
          {(activeTab === "security" || activeTab === "notifications" || activeTab === "billing") && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
                <ExternalLink className="w-6 h-6 text-slate-500" />
              </div>
              <h3 className="text-white font-bold">{tabs.find(t => t.id === activeTab)?.label} Module</h3>
              <p className="text-sm text-slate-500 mt-1 max-w-xs">This module is currently being optimized for high-security auditing standards.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
