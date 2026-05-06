import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import UploadClient from "./UploadClient";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function UploadPage() {
  const session = await auth();

  if (!session?.user?.firmId) {
    redirect("/login");
  }

  const firmId = session.user.firmId;

  let firm;
  try {
    firm = await prisma.firm.findUnique({
      where: { id: firmId },
    });
  } catch (error) {
    console.error("Upload page DB error:", error);
    return (
      <div className="p-8 text-center mt-20">
        <h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
        <p className="text-slate-400">We couldn't verify your account status. Please try again later.</p>
      </div>
    );
  }

  if (!firm) {
    return <div className="p-8 text-center text-slate-400 mt-20">Error loading firm details.</div>;
  }

  const isFree = firm.subscriptionStatus === "TRIALING";
  const limitReached = firm.scansUsed >= firm.scansLimit;

  // Paywall enforcement
  if (isFree && limitReached) {
    return (
      <div className="max-w-2xl mx-auto mt-20 text-center">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-danger to-amber-500" />
          <div className="w-20 h-20 bg-danger/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-danger" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">You've used all {firm.scansLimit} free audits.</h2>
          <p className="text-slate-400 mb-8 text-lg">
            Subscribe to run unlimited audits and unlock full AI anomaly detection capabilities.
          </p>
          <Link href="/billing" className="inline-block px-8 py-4 bg-primary text-slate-950 font-bold rounded-xl hover:bg-primary-dark transition-all shadow-[0_0_20px_rgba(56,189,248,0.3)]">
            Upgrade Now
          </Link>
        </div>
      </div>
    );
  }

  return <UploadClient />;
}
