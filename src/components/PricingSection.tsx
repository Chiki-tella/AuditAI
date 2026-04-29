"use client";

import { motion } from "framer-motion";
import { Check, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-slate-950">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 w-fit mb-6">
            <span className="text-xs font-medium text-primary uppercase tracking-wider">Early Access Pricing</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-slate-400 max-w-2xl text-lg">
            Start using AuditAI for free during our early access period. Upgrade only when you're ready to scale your firm's capacity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Tier */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 rounded-3xl bg-card-bg border border-card-border flex flex-col h-full hover:-translate-y-2 hover:border-slate-500 transition-all duration-300"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-white mb-2">Free Trial</h3>
              <p className="text-slate-400 text-sm">Perfect for testing the waters and seeing the AI in action.</p>
            </div>
            <div className="mb-8">
              <span className="text-5xl font-bold text-white">$0</span>
              <span className="text-slate-400">/mo</span>
            </div>
            <ul className="flex flex-col gap-4 text-slate-300 mb-8 flex-1">
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-accent flex-shrink-0" />
                <span>3 free client audits</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-accent flex-shrink-0" />
                <span>Universal CSV & Excel parsing</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-accent flex-shrink-0" />
                <span>Basic PDF report exports</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-accent flex-shrink-0" />
                <span>Standard email support</span>
              </li>
            </ul>
            <Link 
              href="/signup?plan=free"
              className="w-full flex items-center justify-center py-4 rounded-xl font-medium text-white bg-card-bg border border-card-border hover:bg-slate-800 transition-colors"
            >
              Get Started for Free
            </Link>
          </motion.div>

          {/* Pro Tier */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-8 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-primary/50 relative flex flex-col h-full shadow-[0_0_30px_rgba(14,165,233,0.15)] hover:-translate-y-2 hover:border-primary transition-all duration-300"
          >
            <div className="absolute top-0 right-8 -translate-y-1/2 px-4 py-1 rounded-full bg-primary text-white text-xs font-bold tracking-wide uppercase">
              Most Popular
            </div>
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-white mb-2">Pro Firm</h3>
              <p className="text-slate-400 text-sm">For growing accounting firms that need unrestricted capacity.</p>
            </div>
            <div className="mb-8">
              <span className="text-5xl font-bold text-white">$49</span>
              <span className="text-slate-400">/mo</span>
              <div className="text-xs text-primary mt-2">Early adopter pricing (Normally $99/mo)</div>
            </div>
            <ul className="flex flex-col gap-4 text-slate-300 mb-8 flex-1">
              <li className="flex items-center gap-3 text-white font-medium">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                <span>Unlimited client audits</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0" />
                <span>Advanced anomaly detection</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0" />
                <span>Detailed severity rankings</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0" />
                <span>Priority support</span>
              </li>
            </ul>
            <Link 
              href="/signup?plan=pro"
              className="w-full flex items-center justify-center py-4 rounded-xl font-medium text-white bg-primary hover:bg-primary-dark transition-all duration-300 shadow-[0_0_15px_rgba(14,165,233,0.3)] hover:shadow-[0_0_25px_rgba(14,165,233,0.5)]"
            >
              Upgrade to Pro
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
