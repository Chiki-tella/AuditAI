"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2 } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mocking an API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset after a few seconds and close
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-[101] p-6"
          >
            <div className="bg-card-bg border border-card-border rounded-3xl shadow-2xl overflow-hidden relative">
              {/* Background glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] -z-10 rounded-full" />
              
              <div className="flex items-center justify-between p-6 border-b border-card-border/50">
                <h3 className="text-xl font-semibold text-white">Contact Sales</h3>
                <button 
                  onClick={onClose}
                  className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                {isSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-12"
                  >
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="text-xl font-semibold text-white mb-2">Message Sent!</h4>
                    <p className="text-slate-400">
                      Thanks for reaching out. Our team will get back to you shortly.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="grid grid-cols-2 gap-5">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="firstName" className="text-sm font-medium text-slate-300">First Name</label>
                        <input 
                          type="text" 
                          id="firstName" 
                          required
                          className="px-4 py-3 bg-slate-900/50 border border-card-border rounded-xl text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                          placeholder="John"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="lastName" className="text-sm font-medium text-slate-300">Last Name</label>
                        <input 
                          type="text" 
                          id="lastName" 
                          required
                          className="px-4 py-3 bg-slate-900/50 border border-card-border rounded-xl text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-sm font-medium text-slate-300">Work Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        required
                        className="px-4 py-3 bg-slate-900/50 border border-card-border rounded-xl text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        placeholder="john@accountingfirm.com"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="concern" className="text-sm font-medium text-slate-300">How can we help?</label>
                      <select 
                        id="concern" 
                        required
                        className="px-4 py-3 bg-slate-900/50 border border-card-border rounded-xl text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none"
                      >
                        <option value="" disabled selected>Select a topic</option>
                        <option value="demo">Request a Demo</option>
                        <option value="pricing">Pricing Details</option>
                        <option value="support">Technical Support</option>
                        <option value="other">Other Inquiry</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="message" className="text-sm font-medium text-slate-300">Message</label>
                      <textarea 
                        id="message" 
                        required
                        rows={4}
                        className="px-4 py-3 bg-slate-900/50 border border-card-border rounded-xl text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                        placeholder="Tell us a bit about your firm's needs..."
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="mt-2 w-full flex items-center justify-center gap-2 py-4 rounded-xl font-medium text-white bg-primary hover:bg-primary-dark transition-all duration-300 shadow-[0_0_15px_rgba(14,165,233,0.2)] hover:shadow-[0_0_25px_rgba(14,165,233,0.4)] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
