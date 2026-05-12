import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { getSession } from '@/lib/auth/session';

export async function GET(req: NextRequest, props: { params: Promise<{ reportId: string }> }) {
  const params = await props.params;
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized", code: "UNAUTHORIZED" }, { status: 401 });
    }

    const report = await prisma.report.findUnique({
      where: { id: params.reportId }
    });

    if (!report || report.firmId !== (session.user as any).firmId) {
      return NextResponse.json({ error: "Not found", code: "NOT_FOUND" }, { status: 404 });
    }

    return NextResponse.json({ 
      status: report.status, 
      criticalCount: report.criticalCount, 
      warningCount: report.warningCount, 
      noticeCount: report.noticeCount 
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error", code: "INTERNAL_ERROR" }, { status: 500 });
  }
}
