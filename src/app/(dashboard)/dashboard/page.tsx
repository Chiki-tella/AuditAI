import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  FileSearch, 
  Users, 
  ArrowUpRight,
  PlusCircle,
  FolderOpen
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.firmId) {
    redirect("/login");
  }

  const firmId = session.user.firmId;

  let firm;
  let totalClients = 0;
  let totalReports = 0;
  let reportsThisMonth = 0;
  let issuesThisMonth = 0;
  let criticalIssuesThisMonth = 0;
  let recentReports: any[] = [];

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  try {
    firm = await prisma.firm.findUnique({
      where: { id: firmId },
    });

    if (!firm) {
      return <div className="p-8 text-center text-slate-400">Error loading firm details.</div>;
    }

    totalClients = await prisma.client.count({ where: { firmId } });
    totalReports = await prisma.report.count({ where: { client: { firmId } } });
    reportsThisMonth = await prisma.report.count({
      where: { client: { firmId }, createdAt: { gte: startOfMonth } },
    });
    issuesThisMonth = await prisma.issue.count({
      where: { report: { client: { firmId } }, createdAt: { gte: startOfMonth } },
    });
    criticalIssuesThisMonth = await prisma.issue.count({
      where: { report: { client: { firmId } }, severity: "CRITICAL", createdAt: { gte: startOfMonth } },
    });
    recentReports = await prisma.report.findMany({
      where: { client: { firmId } },
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { client: true },
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
        <p className="text-slate-400">We couldn't load your dashboard data at this time. Please try again later.</p>
      </div>
    );
  }

  const isFree = firm.subscriptionStatus === "TRIALING";
  const limitReached = firm.scansUsed >= firm.scansLimit;

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Subscription Banner */}
      {isFree && !limitReached && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex items-center justify-between">
          <p className="text-primary font-medium">
            Free Trial — {firm.scansUsed} of {firm.scansLimit} audits used. Upgrade for unlimited access.
          </p>
          <Link href="/billing" className="text-sm font-bold bg-primary text-slate-900 px-4 py-2 rounded-lg hover:bg-primary-dark transition">
            Upgrade Now
          </Link>
        </div>
      )}
      
      {isFree && limitReached && (
        <div className="bg-danger/10 border border-danger/20 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-danger font-medium flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            You have used all {firm.scansLimit} free audits. Subscribe to continue.
          </p>
          <Link href="/billing" className="text-sm font-bold bg-danger text-white px-4 py-2 rounded-lg hover:bg-danger-dark transition shrink-0">
            Upgrade Now
          </Link>
        </div>
      )}

      {!isFree && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 inline-flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <p className="text-emerald-500 text-sm font-medium">Pro Plan — Unlimited audits</p>
        </div>
      )}

      {/* 2. Empty State */}
      {totalClients === 0 && totalReports === 0 ? (
        <div className="bg-[#0f172a]/60 backdrop-blur-sm border border-slate-800/60 rounded-2xl p-12 text-center max-w-2xl mx-auto mt-12">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <FolderOpen className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Welcome to AuditAI — let's run your first audit</h2>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">
            Upload your client's financial data to automatically detect anomalies, duplicates, and high-risk transactions.
          </p>
          <Link href="/upload" className="inline-flex items-center gap-2 bg-primary text-slate-950 px-6 py-3 rounded-lg font-bold hover:bg-primary-dark transition shadow-[0_0_15px_rgba(14,165,233,0.3)]">
            <PlusCircle className="w-5 h-5" />
            Upload Client Data
          </Link>
        </div>
      ) : (
        /* 3. Active State */
        <>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight font-heading">
                Audit Intelligence Overview
              </h1>
              <p className="text-slate-400 mt-1">
                Real-time monitoring across your professional portfolio.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/reports" className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
                View All Reports
              </Link>
              <Link href="/upload" className="flex items-center gap-2 px-4 py-2 bg-primary text-slate-950 rounded-lg text-sm font-bold hover:bg-primary-dark transition-all shadow-[0_0_15px_rgba(14,165,233,0.3)]">
                <PlusCircle className="w-4 h-4" />
                New Audit
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              label="Active Clients" 
              value={totalClients.toString()} 
              icon={Users} 
              color="text-primary" 
            />
            <StatCard 
              label="Reports This Month" 
              value={reportsThisMonth.toString()} 
              icon={BarChart3} 
              color="text-primary/90" 
            />
            <StatCard 
              label="Anomalies Found (Mtd)" 
              value={issuesThisMonth.toString()} 
              icon={AlertTriangle} 
              color="text-amber-500" 
            />
            <StatCard 
              label="Critical Issues (Mtd)" 
              value={criticalIssuesThisMonth.toString()} 
              icon={FileSearch} 
              color="text-danger" 
            />
          </div>

          <div className="bg-[#0f172a]/60 backdrop-blur-sm border border-slate-800/60 rounded-2xl overflow-hidden mt-8">
            <div className="p-6 border-b border-slate-800/60">
              <h3 className="text-lg font-bold text-white">Recent Reports</h3>
              <p className="text-sm text-slate-500">Your most recently generated audits</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900/30 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                    <th className="px-6 py-4">Client</th>
                    <th className="px-6 py-4">Period</th>
                    <th className="px-6 py-4">Critical Issues</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40">
                  {recentReports.length > 0 ? (
                    recentReports.map((report) => (
                      <tr key={report.id} className="hover:bg-slate-800/20 transition-colors group">
                        <td className="px-6 py-4">
                          <span className="text-sm font-bold text-white group-hover:text-primary transition-colors">{report.client.name}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-slate-300">{report.period}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-sm font-bold ${report.criticalCount > 0 ? 'text-danger' : 'text-slate-400'}`}>
                            {report.criticalCount}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs text-slate-400">{report.createdAt.toLocaleDateString()}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            report.status === "COMPLETED" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" : 
                            report.status === "FAILED" ? "bg-danger/10 text-danger border border-danger/20" : "bg-slate-800/50 text-slate-400"
                          }`}>
                            {report.status}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link href={`/reports/${report.id}`} className="text-slate-500 hover:text-white transition-colors inline-block">
                            <ArrowUpRight className="w-4 h-4" />
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-slate-500 text-sm">
                        No recent reports found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color }: { label: string, value: string, icon: any, color: string }) {
  return (
    <div className="bg-[#0f172a]/60 backdrop-blur-sm border border-slate-800/60 p-6 rounded-2xl relative overflow-hidden group hover:border-slate-700/80 transition-all">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">{label}</p>
          <h3 className="text-2xl font-bold text-white tracking-tight">{value}</h3>
        </div>
        <div className={`p-2.5 rounded-xl bg-slate-800/50 ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
