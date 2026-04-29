"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-background border-t border-card-border">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center bg-card-bg/50 backdrop-blur-xl border border-card-border rounded-3xl p-10 md:p-16 shadow-2xl shadow-black/50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Social Proof Eyebrow */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="flex -space-x-2">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="w-8 h-8 rounded-full border-2 border-[#0b1120] object-cover" />
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" className="w-8 h-8 rounded-full border-2 border-[#0b1120] object-cover" />
                <img src="https://randomuser.me/api/portraits/men/68.jpg" alt="User" className="w-8 h-8 rounded-full border-2 border-[#0b1120] object-cover" />
              </div>
              <span className="text-sm font-medium text-slate-400">
                Join 200+ forward-thinking firms
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Stop auditing manually. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-primary to-sky-200">
                Start automating today.
              </span>
            </h2>
            
            <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
              Join forward-thinking accounting firms that are using AuditAI to process bookkeeping data 10x faster with higher accuracy.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/signup" 
                className="w-full sm:w-auto px-8 py-4 text-base font-bold text-slate-950 bg-primary hover:bg-primary-dark transition-all duration-300 rounded-full flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]"
              >
                Start Your Free Trial
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="#contact" 
                className="w-full sm:w-auto px-8 py-4 text-base font-medium text-white bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 transition-colors duration-300 rounded-full"
              >
                Talk to Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
