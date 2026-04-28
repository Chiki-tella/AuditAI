"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Clock, ShieldCheck } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] -z-10 mix-blend-screen pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Copy & CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card-bg border border-card-border w-fit">
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span className="text-xs font-medium text-slate-300 uppercase tracking-wider">AI-Powered Auditing</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight text-white">
              Your AI Junior <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Auditor</span> On Demand
            </h1>
            
            <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
              Scan client bookkeeping data and flag issues before a human ever touches it. Get a complete first-pass audit in minutes, not hours.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
              <button className="flex items-center gap-2 px-8 py-4 text-base font-medium text-white bg-primary hover:bg-primary-dark transition-all duration-300 rounded-full shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]">
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-card-bg border border-card-border hover:bg-slate-800 transition-colors rounded-full">
                View Demo
              </button>
            </div>
            
            <div className="flex items-center gap-6 pt-8 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-accent" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-accent" />
                <span>Setup in 2 minutes</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Visual & Stat Cards */}
          <div className="relative w-full aspect-square max-w-[600px] mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative w-full h-full rounded-3xl overflow-hidden border border-card-border/50 bg-card-bg"
            >
              <Image 
                src="/hero-visual.png"
                alt="AI Data Scanning Visualization"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                className="object-cover mix-blend-lighten opacity-80"
                priority
              />
            </motion.div>

            {/* Floating Stat Card 1 */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute -right-6 top-1/4 p-6 rounded-2xl bg-card-bg/80 backdrop-blur-xl border border-card-border shadow-2xl"
            >
              <div className="flex flex-col gap-1">
                <span className="text-sm text-slate-400">Hours Saved</span>
                <span className="text-4xl font-bold text-white">400+</span>
                <span className="text-xs text-accent flex items-center gap-1 mt-1">
                  <CheckCircle className="w-3 h-3" /> Per month/firm
                </span>
              </div>
            </motion.div>

            {/* Floating Stat Card 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute -left-6 bottom-1/4 p-6 rounded-2xl bg-card-bg/80 backdrop-blur-xl border border-card-border shadow-2xl"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/20 text-primary">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-slate-400">Audit Speed</span>
                  <span className="text-2xl font-bold text-white">2 Minutes</span>
                  <span className="text-xs text-slate-500 mt-1">Avg. file processing</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
