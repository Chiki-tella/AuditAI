import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { getSession } from '@/lib/auth/session';

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized", code: "UNAUTHORIZED" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const cursor = searchParams.get('cursor');
    const clientId = searchParams.get('clientId');
    const status = searchParams.get('status');
    const period = searchParams.get('period');
    
    const limit = 20;

    const where: any = { 
      firmId: (session.user as any).firmId,
      deletedAt: null
    };
    
    if (clientId) where.clientId = clientId;
    if (status) where.status = status;
    if (period) where.period = period;

    const reports = await prisma.report.findMany({
      where,
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: 'desc' }
    });

    let nextCursor: typeof cursor | undefined = undefined;
    if (reports.length > limit) {
      const nextItem = reports.pop();
      nextCursor = nextItem?.id;
    }

    return NextResponse.json({ data: reports, nextCursor });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error", code: "INTERNAL_ERROR" }, { status: 500 });
  }
}
