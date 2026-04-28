"use client";

import { motion } from "framer-motion";
import { FileSpreadsheet, Search, AlertTriangle, FileOutput, ShieldAlert } from "lucide-react";

const features = [
  {
    title: "Duplicate Detection",
    description: "Automatically identifies accidental double-entries across entire fiscal years.",
    icon: <Search className="w-6 h-6" />,
    className: "md:col-span-2 md:row-span-1 bg-gradient-to-br from-card-bg to-slate-900",
  },
  {
    title: "Severity Rankings",
    description: "Every issue is ranked Critical, Warning, or Notice so you know what needs immediate attention.",
    icon: <AlertTriangle className="w-6 h-6" />,
    className: "md:col-span-1 md:row-span-2 bg-gradient-to-b from-slate-800 to-card-bg",
  },
  {
    title: "Anomaly Flagging",
    description: "Spots unusual amounts relative to vendor history or budget overruns instantly.",
    icon: <ShieldAlert className="w-6 h-6" />,
    className: "md:col-span-1 md:row-span-1 bg-card-bg",
  },
  {
    title: "Universal Parsing",
    description: "Upload CSVs or Excel sheets from QuickBooks, Xero, or any legacy software.",
    icon: <FileSpreadsheet className="w-6 h-6" />,
    className: "md:col-span-1 md:row-span-1 bg-card-bg",
  },
  {
    title: "Actionable Reports",
    description: "Export clean, ready-to-share PDFs outlining exactly what your clients need to fix.",
    icon: <FileOutput className="w-6 h-6" />,
    className: "md:col-span-2 md:row-span-1 bg-gradient-to-r from-slate-900 to-card-bg",
  },
];

export default function FeaturesBento() {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Everything You Need for a <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Flawless First Pass</span>
          </h2>
          <p className="text-slate-400 max-w-2xl text-lg">
            AuditAI acts as a tireless junior staffer, reviewing thousands of transactions to surface what actually matters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`p-8 rounded-3xl border border-card-border overflow-hidden relative group hover:border-slate-500 transition-colors ${feature.className}`}
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity group-hover:scale-110 duration-500">
                {feature.icon}
              </div>
              
              <div className="relative z-10 flex flex-col h-full justify-between gap-8">
                <div className="p-4 rounded-2xl bg-slate-800/50 w-fit text-primary backdrop-blur-md border border-slate-700">
                  {feature.icon}
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
