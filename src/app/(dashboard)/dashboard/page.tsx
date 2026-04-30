"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Folder, Bell, MoreHorizontal, Edit2, Check, Plus, ArrowUpRight, Sparkles, Filter } from "lucide-react";

export default function DashboardOverview() {
  const [activeTab, setActiveTab] = useState("To do");

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto pb-10">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="max-w-xl">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tight font-heading mb-3"
          >
            Make Bookkeeping Simple !
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-slate-400 text-sm md:text-base"
          >
            Management and planning in a simple and attractive style will bring you success.
          </motion.p>
        </div>
      </div>

      {/* Tabs and Add Task */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="flex flex-wrap items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          {["To do", "Work", "High priority"].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === tab 
                  ? "bg-slate-800 text-white" 
                  : "bg-transparent text-slate-400 hover:text-white hover:bg-slate-800/30"
              }`}
            >
              {tab === "To do" && <div className={`w-2 h-2 rounded-full ${activeTab === tab ? "bg-emerald-400" : "bg-slate-600"}`} />}
              {tab}
            </button>
          ))}
          <button className="p-2 rounded-full bg-slate-800/50 text-slate-400 hover:text-white transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-800/80 hover:bg-slate-700 text-white font-medium rounded-full transition-all border border-slate-700/50 hover:border-primary/50 text-sm shadow-[0_0_15px_rgba(14,165,233,0.15)]">
          <Plus className="w-4 h-4 text-primary" />
          New task
        </button>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        
        {/* Left Column (Tasks) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Task Card 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-[#0f172a]/80 backdrop-blur-md rounded-3xl p-6 border border-slate-800/60 shadow-lg relative overflow-hidden group"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                <span className="text-sm font-medium text-primary">Today</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-400 hover:text-white bg-slate-800/50 rounded-full transition-colors">
                  <Bell className="w-4 h-4" />
                </button>
                <button className="p-2 text-slate-400 hover:text-white bg-slate-800/50 rounded-full transition-colors">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-white mb-2">Meeting with pela members</h3>
            <p className="text-slate-400 text-sm mb-6 max-w-2xl">
              Description : meeting to review the new website design with updated features _
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Clock className="w-4 h-4" />
                <span>08:00 Am - 10:00 Am</span>
              </div>
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-[#0f172a] flex items-center justify-center text-xs text-white">
                      U{i}
                    </div>
                  ))}
                </div>
                <span className="text-xs text-slate-400 ml-3">+4 People</span>
              </div>
            </div>
          </motion.div>

          {/* Task Card 2 (Active/Highlighted) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="bg-[#0f172a]/90 backdrop-blur-xl rounded-3xl p-6 border border-primary/20 shadow-[0_8px_30px_rgba(14,165,233,0.15)] relative overflow-hidden"
          >
            {/* Very strong blue glow at bottom */}
            <div className="absolute -bottom-[60%] left-0 right-0 h-full bg-primary/20 blur-[70px] rounded-full pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                  <span className="text-sm font-medium text-primary">Today</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/80 rounded-full text-xs font-medium text-slate-300">
                    <Folder className="w-3.5 h-3.5 text-slate-400" />
                    4 Files
                  </div>
                  <button className="p-2 text-slate-400 hover:text-white bg-slate-800/80 rounded-full transition-colors">
                    <Bell className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-white bg-slate-800/80 rounded-full transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-start gap-5 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                   <div className="w-6 h-6 bg-white rounded-tl-full rounded-br-full rounded-tr-sm rounded-bl-sm" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1.5">Design System</h3>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
                    Description : create a responsive design system for landing pages and projects, focusing on consistency, scalability, and reusable components.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>08:00 Am - 05:00 Pm</span>
                </div>
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full bg-slate-700 border-2 border-[#0f172a] flex items-center justify-center text-[10px] text-white">
                        D{i}
                      </div>
                    ))}
                  </div>
                  <span className="text-xs text-slate-400 ml-3">+6 People</span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-700/50 pt-5">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-400">Participants :</span>
                  <span className="px-3 py-1 rounded-full bg-blue-900/40 text-blue-300 text-xs font-medium border border-blue-800/50">Design team</span>
                  <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium">Marketing team</span>
                  <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-medium hidden sm:block">Development Team</span>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="text-sm text-slate-300">Progress :</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-6 bg-slate-800/80 rounded-full p-1 border border-slate-700/50 flex">
                      <div className="h-full bg-gradient-to-r from-blue-600 to-primary rounded-full w-[70%] relative overflow-hidden">
                         <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(255,255,255,0.1)_4px,rgba(255,255,255,0.1)_8px)]" />
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-white">%70</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Task Card 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="bg-[#0f172a]/80 backdrop-blur-md rounded-3xl p-6 border border-slate-800/60 shadow-lg relative overflow-hidden group"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                <span className="text-sm font-medium text-emerald-400">Today</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-400 hover:text-white bg-slate-800/50 rounded-full transition-colors">
                  <Bell className="w-4 h-4" />
                </button>
                <button className="p-2 text-slate-400 hover:text-white bg-slate-800/50 rounded-full transition-colors">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-white mb-2">Meeting With The Sales Team</h3>
            <p className="text-slate-400 text-sm mb-6 max-w-2xl">
              Description : checking the sales of the month and estimating the costs and sales of the next month
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Clock className="w-4 h-4" />
                <span>11:00 Am - 02:00 Am</span>
              </div>
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  {[1,2].map(i => (
                     <div key={i} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-[#0f172a] flex items-center justify-center text-xs text-white">
                     S{i}
                   </div>
                  ))}
                </div>
                <span className="text-xs text-slate-400 ml-3">+2 People</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Right Column (Widgets) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Today note */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
            className="rounded-3xl p-6 relative overflow-hidden bg-gradient-to-br from-[#1e3a8a]/90 via-[#0f2366]/90 to-[#020617] border border-blue-800/50 shadow-[0_0_30px_rgba(30,58,138,0.2)]"
          >
            {/* Top right gradient glow */}
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-primary/30 blur-[60px] rounded-full pointer-events-none" />

            <div className="flex items-center justify-between mb-4 relative z-10">
              <h3 className="text-lg font-semibold text-white">Today note</h3>
              <button className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
            <div className="relative z-10 pl-3 border-l-[3px] border-primary/60 mb-6">
              <p className="text-sm text-blue-100 leading-relaxed font-medium">
                Going to the company and <span className="text-white font-bold">planning meetings</span> for the week ahead 🏀
              </p>
            </div>
            
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2 text-blue-200 text-xs font-medium">
                <Sparkles className="w-4 h-4 text-primary" />
                20min ago
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium text-white hover:bg-white/20 transition-colors border border-white/5">
                <Check className="w-3.5 h-3.5" />
                I'm going
              </button>
            </div>
          </motion.div>

          {/* My Files */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
            className="bg-[#0f172a]/80 backdrop-blur-md rounded-3xl p-6 border border-slate-800/60 shadow-lg relative"
          >
            {/* Center subtle glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/10 blur-[40px] rounded-full pointer-events-none" />

            <div className="flex items-center justify-between mb-8 relative z-10">
              <h3 className="text-lg font-semibold text-white">My files</h3>
              <button className="p-2 text-slate-400 hover:text-white transition-colors bg-slate-800/50 rounded-full">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col items-center justify-center py-6 relative z-10">
               <div className="w-20 h-14 bg-slate-800/80 rounded-2xl flex items-center justify-center mb-4 relative shadow-inner border border-slate-700/50">
                 <div className="absolute -left-2 -top-2 w-8 h-8 bg-[#0f172a] rounded-full flex items-center justify-center border border-slate-700/50 z-10 shadow-sm">
                   <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                 </div>
                 <div className="w-8 h-1 bg-slate-600 rounded-full" />
                 <div className="w-4 h-1 bg-slate-600 rounded-full absolute bottom-4 left-6" />
               </div>
               <p className="text-sm text-slate-400 font-medium mb-1">You have not added a file yet</p>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800/60 flex items-center justify-between relative z-10">
              <div>
                <p className="text-[11px] text-slate-500 mb-2">More than 20 formats...</p>
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded bg-blue-600/20 text-blue-400 flex items-center justify-center text-[10px] font-bold border border-blue-500/20">W</div>
                  <div className="w-6 h-6 rounded bg-emerald-600/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold border border-emerald-500/20">X</div>
                  <div className="w-6 h-6 rounded bg-orange-600/20 text-orange-400 flex items-center justify-center text-[10px] font-bold border border-orange-500/20">P</div>
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/80 hover:bg-slate-700 text-white text-xs font-semibold rounded-full transition-colors border border-slate-700/50">
                <Plus className="w-3.5 h-3.5 text-primary" />
                Add file
              </button>
            </div>
          </motion.div>

          {/* Activity Widget */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}
            className="bg-[#0f172a]/80 backdrop-blur-md rounded-3xl p-6 border border-slate-800/60 shadow-lg relative overflow-hidden"
          >
             <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/10 blur-[40px] rounded-full pointer-events-none" />

            <div className="flex items-start justify-between mb-6 relative z-10">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Activity</h3>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  13 Tasks Completed <span className="text-yellow-400">🥳</span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-slate-400 font-medium px-3 py-1.5 rounded-full border border-slate-700/50 bg-slate-800/50">Get the report</span>
                <button className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-primary flex items-center justify-center text-white shadow-[0_0_15px_rgba(14,165,233,0.4)]">
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Minimalist Line Chart / Activity Graph */}
            <div className="h-28 w-full relative flex items-end pt-4 pb-2 z-10">
               {/* Background Lines */}
               <div className="absolute inset-0 flex flex-col justify-between pt-4 pb-2 pointer-events-none">
                 {[1, 2, 3].map((i) => (
                   <div key={i} className="w-full h-[1px] bg-slate-800/40" />
                 ))}
               </div>

               {/* Wave Chart */}
               <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                 <path 
                   d="M0 35 Q 15 35, 25 25 T 50 25 T 70 5 T 85 15 T 100 10" 
                   fill="none" 
                   stroke="#38bdf8" 
                   strokeWidth="1.5" 
                   className="opacity-80"
                   vectorEffect="non-scaling-stroke"
                 />
                 <path 
                   d="M0 40 L 0 35 Q 15 35, 25 25 T 50 25 T 70 5 T 85 15 T 100 10 L 100 40 Z" 
                   fill="url(#gradient)" 
                   className="opacity-30"
                 />
                 <defs>
                   <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                     <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                     <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
                   </linearGradient>
                 </defs>
               </svg>

               {/* Data point hover indicator */}
               <div className="absolute top-[10%] left-[70%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
                 <div className="px-2 py-0.5 bg-primary text-slate-950 text-[10px] font-bold rounded-full mb-1">
                   80%
                 </div>
                 <div className="w-2 h-2 bg-primary rounded-full ring-4 ring-primary/20 shadow-[0_0_10px_rgba(56,189,248,1)] z-10" />
                 <div className="w-[1px] h-16 bg-gradient-to-b from-primary to-transparent opacity-50 -mt-1" />
               </div>
            </div>
            
            {/* X Axis */}
            <div className="flex justify-between mt-2 text-[10px] text-slate-500 font-medium px-1 relative z-10">
              <span className="opacity-50">Jan</span>
              <span className="opacity-50">Feb</span>
              <span className="opacity-50">Mar</span>
              <span className="text-white">Apr</span>
              <span className="opacity-50">May</span>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

