"use client";

import { motion } from "framer-motion";
import { Sparkles, Shield, LayoutDashboard, FileText, AlertCircle, Users, ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-0 overflow-hidden text-center bg-[#020617]">
      {/* Intense Light Beams (Icy Blue) */}
      <div className="absolute top-[-10%] left-[10%] w-[300px] h-[800px] bg-sky-400/10 blur-[120px] -rotate-12 pointer-events-none mix-blend-screen" />
      <div className="absolute top-[-10%] right-[10%] w-[300px] h-[800px] bg-blue-400/10 blur-[120px] rotate-12 pointer-events-none mix-blend-screen" />
      
      {/* Central Glow */}
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/20 blur-[150px] -z-10 pointer-events-none mix-blend-screen" />

      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,transparent,black,transparent)] -z-20 opacity-50" />

      <div className="container mx-auto px-6 lg:px-12 flex flex-col items-center relative z-10 w-full">
        
        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
            Your AI Junior <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-primary to-sky-200">
              Auditor On Demand
            </span>
          </h1>
        </motion.div>
        
        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-lg md:text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed font-light"
        >
          Scale your firm, not your workload. A minimal AI-powered system that scans client bookkeeping data and flags issues before a human ever touches it.
        </motion.p>

        {/* CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center gap-5 mb-24"
        >
          <button className="w-full sm:w-auto px-8 py-3.5 text-base font-bold text-slate-950 bg-primary hover:bg-primary-dark transition-all duration-300 rounded-full flex items-center justify-center gap-2">
            Get Started
            <ArrowRight className="w-4 h-4" />
          </button>
          <button className="w-full sm:w-auto px-8 py-3.5 text-base font-medium text-white bg-slate-900/50 backdrop-blur-md border border-slate-700 hover:bg-slate-800 hover:border-slate-500 transition-colors duration-300 rounded-full">
            Watch Demo
          </button>
        </motion.div>

        {/* CSS Mockup Dashboard Visual */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative w-full max-w-5xl mx-auto"
        >
          {/* Glowing Wave/Electric Effect on top of dashboard */}
          <div className="absolute -top-[2px] left-1/2 -translate-x-1/2 w-full max-w-4xl h-[4px] bg-gradient-to-r from-transparent via-primary to-transparent blur-[2px] opacity-80" />
          <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90" />
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[60%] h-[40px] bg-primary/20 blur-[20px]" />

          <div className="relative rounded-t-2xl overflow-hidden border-t border-l border-r border-slate-700/50 bg-[#0f172a]/90 backdrop-blur-2xl shadow-2xl shadow-primary/10 flex flex-col md:flex-row min-h-[400px] md:h-[500px]">
            
            {/* Sidebar Mockup */}
            <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-800/60 p-6 hidden md:block">
              <div className="flex items-center gap-2 mb-10 text-primary">
                <Shield className="w-6 h-6" />
                <span className="font-bold text-lg">AuditAI</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 px-3 py-2.5 bg-slate-800/80 text-white rounded-lg text-sm font-medium border border-slate-700/50">
                  <LayoutDashboard className="w-4 h-4 text-primary" /> Overview
                </div>
                <div className="flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-white transition-colors rounded-lg text-sm">
                  <FileText className="w-4 h-4" /> Transactions
                </div>
                <div className="flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-white transition-colors rounded-lg text-sm">
                  <AlertCircle className="w-4 h-4" /> Anomalies
                  <span className="ml-auto bg-primary/20 text-primary text-[10px] px-1.5 py-0.5 rounded-full">12</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-white transition-colors rounded-lg text-sm">
                  <Users className="w-4 h-4" /> Clients
                </div>
              </div>
            </div>

            {/* Main Content Mockup */}
            <div className="flex-1 p-6 md:p-10 text-left">
              <h3 className="text-2xl font-light text-slate-200 mb-2">
                Welcome To <span className="font-serif italic text-blue-200">Dashboard</span>
              </h3>
              <p className="text-sm text-slate-400 mb-10 max-w-lg">
                Manage your firm's audits, review high-risk anomalies, and experience the speed of AI bookkeeping.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Main Stats Panel */}
                <div className="lg:col-span-2 bg-[#0b1120] border border-slate-800/80 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-sm font-medium text-slate-300">Audits Processed</h4>
                    <span className="text-xs text-primary px-2 py-1 bg-primary/10 rounded">This Month</span>
                  </div>
                  <div className="flex items-end gap-4 mb-8">
                    <div className="text-4xl font-bold text-white tracking-tight">1,245</div>
                    <div className="text-primary text-sm font-medium mb-1 flex items-center gap-1">
                      ↑ 12.5%
                    </div>
                  </div>
                  {/* Mock Bar Chart */}
                  <div className="flex items-end justify-between h-28 gap-2">
                    {[30, 45, 25, 60, 40, 75, 100].map((h, i) => (
                      <div key={i} className="w-full relative group">
                        <div className="absolute bottom-0 w-full rounded-t-sm bg-gradient-to-t from-primary/10 to-primary/60 transition-all duration-300 group-hover:to-primary" style={{ height: `${h}%` }}></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions Panel */}
                <div className="bg-[#0b1120] border border-slate-800/80 rounded-xl p-6">
                  <h4 className="text-sm font-medium text-slate-300 mb-6">Quick Actions</h4>
                  <div className="flex flex-col gap-3">
                    <div className="px-4 py-3 bg-slate-800/40 border border-slate-700/50 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer transition-colors flex justify-between items-center">
                      Run Deep Scan <ArrowRight className="w-3 h-3 opacity-50" />
                    </div>
                    <div className="px-4 py-3 bg-slate-800/40 border border-slate-700/50 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer transition-colors flex justify-between items-center">
                      Review Anomalies <ArrowRight className="w-3 h-3 opacity-50" />
                    </div>
                    <div className="px-4 py-3 bg-slate-800/40 border border-slate-700/50 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer transition-colors flex justify-between items-center">
                      Export Reports <ArrowRight className="w-3 h-3 opacity-50" />
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
