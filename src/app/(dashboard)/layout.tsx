"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, AlertCircle, Users, Settings, Search, Bell, Menu, X } from "lucide-react";
import Logo from "@/components/Logo";

const navigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Transactions", href: "/transactions", icon: FileText },
  { name: "Anomalies", href: "/anomalies", icon: AlertCircle, badge: "12" },
  { name: "Clients", href: "/clients", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 flex overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-72 bg-[#0f172a]/90 backdrop-blur-xl border-r border-slate-800/60
        transform transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="h-20 flex items-center px-8 border-b border-slate-800/60 justify-between lg:justify-center">
          <Logo className="scale-90" />
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-8 px-4 flex flex-col gap-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (pathname === "/" && item.href === "/dashboard");
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300
                  ${isActive 
                    ? "bg-slate-800/80 text-white border border-slate-700/50 shadow-[0_0_15px_rgba(14,165,233,0.1)]" 
                    : "text-slate-400 hover:text-white hover:bg-slate-800/40 border border-transparent"
                  }
                `}
                onClick={() => setIsSidebarOpen(false)}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-primary" : "opacity-70"}`} />
                {item.name}
                {item.badge && (
                  <span className={`ml-auto text-[11px] px-2 py-0.5 rounded-full font-bold ${isActive ? "bg-primary/20 text-primary" : "bg-slate-800 text-slate-300"}`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-slate-800/60">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-800/80">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-blue-600 flex items-center justify-center text-white font-bold">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Jane Doe</p>
              <p className="text-xs text-slate-500 truncate">Partner</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative z-10">
        {/* Topbar */}
        <header className="h-20 bg-background/50 backdrop-blur-md border-b border-slate-800/60 flex items-center justify-between px-4 lg:px-10 z-20">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-400 hover:text-white bg-slate-900/50 rounded-lg border border-slate-800"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden md:flex items-center relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3" />
              <input 
                type="text" 
                placeholder="Search transactions, clients..." 
                className="w-80 bg-slate-900/50 border border-slate-800 rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-2 w-2 h-2 bg-primary rounded-full ring-2 ring-background"></span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-10 scroll-smooth">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
