"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, CheckCircle2, X, AlertCircle, UploadCloud, ShieldCheck, RefreshCw } from "lucide-react";

export default function UploadPage() {
  const [activeMode, setActiveMode] = useState<"upload" | "sync">("upload");
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<{ name: string; size: string; status: string }[]>([]);

  const platforms = [
    {
      name: "QuickBooks",
      status: "Available",
      logo: "https://www.vectorlogo.zone/logos/intuit_quickbooks/intuit_quickbooks-icon.svg",
      color: "bg-white p-3"
    },
    {
      name: "Xero",
      status: "Available",
      logo: "https://www.vectorlogo.zone/logos/xero/xero-icon.svg",
      color: "bg-white p-2"
    },
    {
      name: "Sage",
      status: "Available",
      logo: "https://www.vectorlogo.zone/logos/sage/sage-icon.svg",
      color: "bg-white p-3"
    },
    {
      name: "FreshBooks",
      status: "Coming Soon",
      logo: "https://www.vectorlogo.zone/logos/freshbooks/freshbooks-icon.svg",
      color: "bg-white p-3 opacity-50"
    }
  ];

  const handleUpload = () => {
    // Mock upload behavior
    setFiles([{ name: "Q1_General_Ledger.csv", size: "2.4 MB", status: "processing" }]);
    setTimeout(() => {
      setFiles([{ name: "Q1_General_Ledger.csv", size: "2.4 MB", status: "complete" }]);
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold text-white tracking-tight font-heading">Data Ingestion Center</h1>
        <p className="text-slate-400 max-w-lg mx-auto">Choose how you want to feed your audit data to the AI. Connect live platforms or upload manual files.</p>
      </div>

      {/* Mode Switcher */}
      <div className="flex justify-center">
        <div className="bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 flex items-center gap-1">
          <button
            onClick={() => setActiveMode("upload")}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeMode === "upload" ? "bg-primary text-slate-950 shadow-lg" : "text-slate-500 hover:text-slate-300"}`}
          >
            <UploadCloud className="w-4 h-4" />
            Direct Upload
          </button>
          <button
            onClick={() => setActiveMode("sync")}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeMode === "sync" ? "bg-primary text-slate-950 shadow-lg" : "text-slate-500 hover:text-slate-300"}`}
          >
            <RefreshCw className="w-4 h-4" />
            Platform Sync
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeMode === "upload" ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
            {/* Drag & Drop Area */}
            <motion.div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleUpload(); }}
              className={`relative border-2 border-dashed rounded-3xl p-16 transition-all flex flex-col items-center justify-center text-center space-y-6 ${isDragging
                  ? "border-primary bg-primary/5 shadow-[0_0_30px_rgba(14,165,233,0.1)]"
                  : "border-slate-800 bg-slate-900/40 hover:border-slate-700"
                }`}
            >
              <div className="w-24 h-24 rounded-3xl bg-slate-800 flex items-center justify-center group">
                <UploadCloud className={`w-12 h-12 transition-all ${isDragging ? "text-primary animate-bounce" : "text-slate-500 group-hover:text-primary"}`} />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">Manual Data Upload</h3>
                <p className="text-sm text-slate-500 max-w-xs mx-auto">Drop your CSV, XLSX, or PDF statements here to begin AI analysis.</p>
              </div>

              <button
                onClick={handleUpload}
                className="px-10 py-3.5 bg-primary text-slate-950 font-bold rounded-xl hover:bg-primary-dark transition-all shadow-[0_0_20px_rgba(56,189,248,0.3)]"
              >
                Select Source Files
              </button>

              <div className="flex items-center gap-8 pt-8 border-t border-slate-800/60 w-full justify-center opacity-60">
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  SOC2 Certified
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  Bank-Grade Security
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="sync"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {platforms.map((platform) => (
              <div
                key={platform.name}
                className="bg-[#0f172a]/60 border border-slate-800 rounded-3xl p-6 hover:border-slate-700 transition-all group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl ${platform.color} flex items-center justify-center shadow-lg overflow-hidden`}>
                    <img src={platform.logo} alt={platform.name} className="w-full h-full object-contain" />
                  </div>
                  <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${platform.status === "Available" ? "bg-primary/10 text-primary" : "bg-slate-800 text-slate-500"}`}>
                    {platform.status}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{platform.name} Integration</h3>
                <p className="text-sm text-slate-500 mb-6">Direct API sync for real-time audit monitoring of your {platform.name} ledger.</p>

                <button
                  disabled={platform.status !== "Available"}
                  className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${platform.status === "Available"
                      ? "bg-slate-800 text-white hover:bg-primary hover:text-slate-950"
                      : "bg-slate-900/50 text-slate-700 cursor-not-allowed"
                    }`}
                >
                  {platform.status === "Available" ? "Connect Account" : "Coming Soon"}
                </button>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Processing List (Global) */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-10 border-t border-slate-800/60"
          >
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 px-2">Live AI Processing Queue</h4>
            {files.map((file, i) => (
              <div key={i} className="bg-slate-900/40 border border-slate-800/40 rounded-2xl p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{file.name}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">{file.size}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  {file.status === "processing" ? (
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-[10px] font-bold text-primary animate-pulse uppercase tracking-widest">AI Auditing...</span>
                      <div className="w-40 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 3 }}
                          className="h-full bg-primary"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 px-4 py-1.5 bg-primary text-slate-950 rounded-full text-xs font-bold shadow-[0_0_15px_rgba(56,189,248,0.4)]">
                      <CheckCircle2 className="w-4 h-4" /> Ready for Review
                    </div>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
