"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    question: "Does AuditAI replace human accountants?",
    answer: "No. AuditAI is designed to be a tireless junior assistant. It handles the repetitive grunt work of scanning thousands of transactions for errors, so that senior accountants can focus their time on high-value advisory work and final review."
  },
  {
    question: "What types of files can I upload?",
    answer: "You can upload financial data exported as CSV or Excel (.xlsx) files from any major accounting software like QuickBooks, Xero, or NetSuite."
  },
  {
    question: "How long does an audit take?",
    answer: "While manual reviews can take hours or days, AuditAI processes most standard client files (up to thousands of transactions) in just a few minutes, generating a complete, ranked report instantly."
  },
  {
    question: "Is client data secure?",
    answer: "Absolutely. We use enterprise-grade encryption and do not train our underlying models on your specific client data. All uploads are processed securely and can be deleted immediately after report generation."
  },
  {
    question: "What does the free trial include?",
    answer: "The free trial gives you full access to the core auditing engine for up to 3 complete client file reviews, allowing you to see the accuracy and time-savings firsthand before committing."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 relative bg-slate-900/50 border-t border-card-border">
      <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 max-w-2xl text-lg">
            Everything you need to know about integrating AuditAI into your firm.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="border border-card-border rounded-2xl bg-card-bg overflow-hidden transition-colors hover:border-slate-700"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="text-lg font-medium text-white">{faq.question}</span>
                <Plus 
                  className={`w-5 h-5 transition-all duration-300 ${openIndex === idx ? "rotate-45 text-primary" : "text-slate-400"}`} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 pt-0 text-slate-400 leading-relaxed border-t border-card-border/50 mt-2 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
