"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield } from "lucide-react";
import ContactModal from "./ContactModal";

export default function Header() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 lg:px-12 backdrop-blur-md bg-background/50 border-b border-card-border">
        <Link href="/" className="flex items-center gap-2 text-primary">
          <Shield className="w-8 h-8 text-primary" />
          <span className="text-xl font-bold tracking-tight text-foreground">AuditAI</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 px-8 py-3 bg-card-bg border border-card-border rounded-full backdrop-blur-sm">
          <Link href="#features" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Features
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            How it Works
          </Link>
          <Link href="#pricing" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Pricing
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsContactModalOpen(true)}
            className="hidden md:block text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Contact sales
          </button>
          <Link href="/login" className="hidden md:block text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Log In
          </Link>
          <Link href="/signup" className="px-5 py-2.5 text-sm font-medium text-white bg-primary hover:bg-primary-dark transition-all duration-300 rounded-full shadow-[0_0_15px_rgba(14,165,233,0.3)] hover:shadow-[0_0_25px_rgba(14,165,233,0.5)]">
            Start Free Trial
          </Link>
        </div>
      </header>

      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </>
  );
}
