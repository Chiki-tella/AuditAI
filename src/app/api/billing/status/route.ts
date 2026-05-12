import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { auth } from '@/lib/auth/session';
import { unstable_cache } from 'next/cache';

const getCachedBillingStatus = unstable_cache(
  async (firmId: string) => {
    return prisma.firm.findUnique({
      where: { id: firmId },
      include: { subscription: true }
    });
  },
  ['billing-status'],
  { revalidate: 30 }
);

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: "Forbidden", code: "FORBIDDEN" }, { status: 403 });
    }

    const firmId = (session.user as any).firmId;
    const firm = await getCachedBillingStatus(firmId);

    if (!firm) {
      return NextResponse.json({ error: "Not found", code: "NOT_FOUND" }, { status: 404 });
    }

    return NextResponse.json({
      plan: firm.subscription?.status === 'ACTIVE' ? 'PRO' : 'FREE',
      scansUsed: firm.scansUsed,
      scansLimit: firm.scansLimit,
      subscriptionStatus: firm.subscription?.status || 'NONE',
      billingHistory: []
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error", code: "INTERNAL_ERROR" }, { status: 500 });
  }
}
