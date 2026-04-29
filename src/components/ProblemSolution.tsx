"use client";

import { motion } from "framer-motion";
import { XCircle, CheckCircle2 } from "lucide-react";

export default function ProblemSolution() {
  return (
    <section id="how-it-works" className="py-24 relative bg-slate-900/50 border-y border-card-border">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Scale Your Firm, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-primary to-sky-200">Not Your Workload</span>
          </h2>
          <p className="text-slate-400 max-w-2xl text-lg">
            Stop capping your client roster because of manual data review. AuditAI handles the grunt work so your senior accountants can focus on advisory.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* The Old Way */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800 flex flex-col gap-6"
          >
            <div className="flex items-center gap-3 text-slate-400 font-medium text-lg pb-4 border-b border-slate-800">
              <XCircle className="w-5 h-5 opacity-70" />
              The Old Way
            </div>
            
            <ul className="flex flex-col gap-4 text-slate-500">
              <li className="flex items-start gap-3">
                <span className="text-slate-600 mt-0.5 font-bold">✕</span>
                Manually reviewing thousands of rows in Excel sheets.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-slate-600 mt-0.5 font-bold">✕</span>
                Junior staff missing duplicate entries due to fatigue.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-slate-600 mt-0.5 font-bold">✕</span>
                Senior accountants wasting hours verifying basic math.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-slate-600 mt-0.5 font-bold">✕</span>
                Turning away new clients because the team is at capacity.
              </li>
            </ul>
          </motion.div>

          {/* The AuditAI Way */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-3xl bg-primary/10 border border-primary/30 flex flex-col gap-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[80px] -z-10 rounded-full" />
            
            <div className="flex items-center gap-3 text-primary font-semibold text-lg pb-4 border-b border-primary/20">
              <CheckCircle2 className="w-6 h-6" />
              With AuditAI
            </div>
            
            <ul className="flex flex-col gap-4 text-white">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                Upload client data and get a ranked audit report in minutes.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                AI catches 99% of anomalies, duplicates, and missing receipts.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                Accountants spend their time fixing issues, not finding them.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                Grow your firm's revenue without proportionally growing headcount.
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
