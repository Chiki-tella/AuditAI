"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Building2, 
  ShieldCheck, 
  BellRing, 
  CreditCard, 
  Users,
  Mail, 
  Save,
  ChevronRight,
  ExternalLink,
  Plus,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Phone,
  Globe,
  Camera
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [isFirmHead] = useState(true); // Mocking firm head status

  const tabs = [
    { id: "general", label: "General", icon: User },
    { id: "firm", label: "Firm Details", icon: Building2 },
    { id: "team", label: "Team Management", icon: Users, hidden: !isFirmHead },
    { id: "security", label: "Security", icon: ShieldCheck },
    { id: "notifications", label: "Notifications", icon: BellRing },
    { id: "billing", label: "Billing", icon: CreditCard },
  ].filter(tab => !tab.hidden);

  return (
    <div className="max-w-6xl">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white tracking-tight">System Settings</h1>
        <p className="text-slate-400 mt-1">Manage your professional profile, firm collaboration, and financial preferences.</p>
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
          <AnimatePresence mode="wait">
            {activeTab === "general" && (
              <motion.div 
                key="general"
                initial={{ opacity: 0, x: 10 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -10 }}
                className="space-y-8"
              >
                {/* Profile Header */}
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center pb-8 border-b border-slate-800/60">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-blue-600/10 border-2 border-slate-700 flex items-center justify-center overflow-hidden">
                      <User className="w-10 h-10 text-primary/40" />
                    </div>
                    <button className="absolute -bottom-2 -right-2 p-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 hover:text-primary transition-colors shadow-xl">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Personal Profile</h3>
                    <p className="text-sm text-slate-400 mt-1">This information will be visible to your team members.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input 
                        type="text" 
                        defaultValue="Jane Doe"
                        className="w-full bg-slate-900/50 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input 
                        type="email" 
                        defaultValue="jane@accountingfirm.com"
                        className="w-full bg-slate-900/50 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Professional Role</label>
                    <select className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-all">
                      <option>Senior Accountant</option>
                      <option>Audit Lead</option>
                      <option>Firm Partner</option>
                      <option>Financial Analyst</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input 
                        type="text" 
                        defaultValue="+1 (555) 000-0000"
                        className="w-full bg-slate-900/50 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Timezone</label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <select className="w-full bg-slate-900/50 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-all">
                        <option>UTC -05:00 (Eastern Time)</option>
                        <option>UTC +00:00 (GMT)</option>
                        <option>UTC +01:00 (CET)</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-slate-800/60 flex justify-end">
                  <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-slate-950 rounded-xl text-sm font-bold hover:bg-primary-dark transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)]">
                    <Save className="w-4 h-4" />
                    Save Profile Changes
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === "firm" && (
              <motion.div 
                key="firm"
                initial={{ opacity: 0, x: 10 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -10 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Legal Firm Name</label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input 
                        type="text" 
                        defaultValue="Doe & Associates CPAs"
                        className="w-full bg-slate-900/50 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Firm Registration ID</label>
                    <input type="text" readOnly value="AUDIT-99281-X" className="w-full bg-slate-800/30 border border-slate-800 rounded-xl px-4 py-3 text-slate-500 cursor-not-allowed" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Tax / VAT ID</label>
                    <input 
                      type="text" 
                      defaultValue="US-991827364"
                      className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-all"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Office Address</label>
                    <textarea 
                      rows={3}
                      defaultValue="123 Financial District, Suite 400&#10;New York, NY 10005&#10;United States"
                      className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-all resize-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Primary Industry</label>
                    <select className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-all">
                      <option>Financial Services</option>
                      <option>B2B Software</option>
                      <option>Healthcare</option>
                      <option>Manufacturing</option>
                    </select>
                  </div>
                </div>
                <div className="pt-6 border-t border-slate-800/60 flex justify-end">
                  <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-slate-950 rounded-xl text-sm font-bold hover:bg-primary-dark transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)]">
                    <Save className="w-4 h-4" />
                    Update Firm Details
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === "billing" && (
              <motion.div 
                key="billing"
                initial={{ opacity: 0, x: 10 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -10 }}
                className="space-y-8"
              >
                {/* Subscription Status Card */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <CreditCard className="w-24 h-24 text-primary" />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider">Pro Enterprise</span>
                        <span className="text-slate-500 text-sm">Active since June 2025</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white">$299.00 <span className="text-sm font-normal text-slate-400">/ month</span></h3>
                      <div className="mt-6 flex items-center gap-4">
                        <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                          <CheckCircle2 className="w-4 h-4" />
                          Auto-renew is ON
                        </div>
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                        <div className="flex items-center gap-2 text-slate-300 text-sm">
                          Next billing: May 12, 2026
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Due Alert */}
                  <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 flex flex-col justify-between shadow-[0_0_30px_rgba(239,68,68,0.1)]">
                    <div className="flex items-center gap-3 text-red-400 mb-4">
                      <AlertTriangle className="w-5 h-5 animate-pulse" />
                      <span className="text-sm font-bold uppercase tracking-wider">Payment Due Soon</span>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">Your subscription will renew in 9 days. Please ensure your payment method is up to date to avoid service interruption.</p>
                    <button className="mt-4 w-full py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs font-bold rounded-lg transition-all border border-red-500/30">
                      Verify Payment Method
                    </button>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-300 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-primary" />
                    Payment Methods
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center justify-between group hover:border-slate-700 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-8 bg-slate-800 rounded flex items-center justify-center text-[10px] font-bold text-slate-400">VISA</div>
                        <div>
                          <p className="text-sm font-medium text-white">•••• 4242</p>
                          <p className="text-xs text-slate-500">Expires 12/28</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold uppercase text-primary bg-primary/10 px-2 py-0.5 rounded">Default</span>
                    </div>
                    <button className="p-4 rounded-xl border border-dashed border-slate-800 hover:border-primary/50 hover:bg-primary/5 transition-all flex items-center justify-center gap-2 text-slate-500 hover:text-primary">
                      <Plus className="w-4 h-4" />
                      <span className="text-sm font-medium">Add New Card</span>
                    </button>
                  </div>
                </div>

                {/* Invoice History */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-300 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    Recent Invoices
                  </h4>
                  <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/30">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-800/50">
                          <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">Date</th>
                          <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">Description</th>
                          <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">Amount</th>
                          <th className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-500">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {[
                          { date: "Apr 12, 2026", desc: "Pro Enterprise Plan - Monthly", amount: "$299.00" },
                          { date: "Mar 12, 2026", desc: "Pro Enterprise Plan - Monthly", amount: "$299.00" },
                          { date: "Feb 12, 2026", desc: "Pro Enterprise Plan - Monthly", amount: "$299.00" },
                        ].map((invoice, idx) => (
                          <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                            <td className="px-4 py-3 text-sm text-slate-300">{invoice.date}</td>
                            <td className="px-4 py-3 text-sm text-white font-medium">{invoice.desc}</td>
                            <td className="px-4 py-3 text-sm text-slate-300">{invoice.amount}</td>
                            <td className="px-4 py-3">
                              <button className="text-primary hover:text-primary-dark text-xs font-bold underline">Download PDF</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "team" && (
              <motion.div 
                key="team"
                initial={{ opacity: 0, x: 10 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -10 }}
                className="space-y-8"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">Team Collaboration</h3>
                    <p className="text-sm text-slate-400 mt-1">Manage accountants and firm members who have access to this portal.</p>
                  </div>
                  <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-slate-950 rounded-xl text-sm font-bold hover:bg-primary-dark transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)]">
                    <Plus className="w-4 h-4" />
                    Invite Accountant
                  </button>
                </div>

                {/* Team Search & Filter */}
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <input 
                      type="text" 
                      placeholder="Search by name or email..."
                      className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50"
                    />
                  </div>
                  <select className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-300 focus:outline-none">
                    <option>All Roles</option>
                    <option>Accountant</option>
                    <option>Manager</option>
                  </select>
                </div>

                {/* Members List */}
                <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/30">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-800/50">
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Member</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Role</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Activity</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {[
                        { name: "Robert Fox", email: "robert@doe-associates.com", role: "Senior Accountant", status: "Active", lastSeen: "2 hours ago", initial: "RF" },
                        { name: "Cody Fisher", email: "cody@doe-associates.com", role: "Tax Specialist", status: "Active", lastSeen: "5 mins ago", initial: "CF" },
                        { name: "Esther Howard", email: "esther@partner.com", role: "External Auditor", status: "Pending", lastSeen: "Never", initial: "EH" },
                      ].map((member, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/30 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
                                {member.initial}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-white">{member.name}</p>
                                <p className="text-xs text-slate-500">{member.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-slate-300">{member.role}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className={`w-1.5 h-1.5 rounded-full ${member.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                              <span className={`text-xs font-medium ${member.status === 'Active' ? 'text-emerald-400' : 'text-amber-400'}`}>{member.status}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-500">
                            {member.lastSeen}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="p-2 text-slate-500 hover:text-white transition-colors">
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === "notifications" && (
              <motion.div 
                key="notifications"
                initial={{ opacity: 0, x: 10 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -10 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-xl font-bold text-white">Notification Preferences</h3>
                  <p className="text-sm text-slate-400 mt-1">Control how and when you receive system alerts.</p>
                </div>

                <div className="space-y-4">
                  {[
                    { title: "Billing & Subscription", desc: "Get notified about upcoming payments and invoice availability.", icon: CreditCard },
                    { title: "Firm Anomalies", desc: "Critical alerts when AI detects high-risk transactions.", icon: AlertTriangle },
                    { title: "Team Collaboration", desc: "Notifications when a member joins or performs significant actions.", icon: Users },
                    { title: "Security Alerts", desc: "Alerts for new login sessions or credential changes.", icon: ShieldCheck },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
                          <item.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{item.title}</p>
                          <p className="text-xs text-slate-500">{item.desc}</p>
                        </div>
                      </div>
                      <div className="w-12 h-6 bg-primary/20 rounded-full relative cursor-pointer border border-primary/30">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-primary rounded-full shadow-[0_0_10px_rgba(14,165,233,0.5)]"></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-slate-800/60 flex justify-end">
                  <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-slate-950 rounded-xl text-sm font-bold hover:bg-primary-dark transition-all">
                    <Save className="w-4 h-4" />
                    Save Preferences
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === "security" && (
              <motion.div 
                key="security"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mb-4 border border-slate-700/50 shadow-[0_0_20px_rgba(14,165,233,0.05)]">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-white font-bold">Security & Encryption</h3>
                <p className="text-sm text-slate-500 mt-1 max-w-xs">Two-factor authentication and session management are being integrated with your firm's SSO provider.</p>
                <button className="mt-6 text-primary hover:text-primary-dark text-xs font-bold underline flex items-center gap-2">
                  View Security Whitepaper <ExternalLink className="w-3 h-3" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
