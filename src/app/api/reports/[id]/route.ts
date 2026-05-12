import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { auth } from '@/lib/auth/session';

export async function GET(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized", code: "UNAUTHORIZED" }, { status: 401 });
    }

    const report = await prisma.report.findUnique({
      where: { id: params.id },
      include: { 
        issues: {
          orderBy: [
            { severity: 'asc' }
          ]
        } 
      }
    });

    if (!report || report.firmId !== (session.user as any).firmId || report.deletedAt !== null) {
      return NextResponse.json({ error: "Not found", code: "NOT_FOUND" }, { status: 404 });
    }

    await prisma.auditLog.create({
      data: {
        firmId: (session.user as any).firmId as string,
        userId: session.user.id as string,
        action: 'VIEW_REPORT',
        metadata: { reportId: params.id },
        ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1'
      }
    });

    return NextResponse.json({ data: report });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error", code: "INTERNAL_ERROR" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: "Forbidden", code: "FORBIDDEN" }, { status: 403 });
    }

    const report = await prisma.report.findUnique({
      where: { id: params.id }
    });

    if (!report || report.firmId !== (session.user as any).firmId) {
      return NextResponse.json({ error: "Not found", code: "NOT_FOUND" }, { status: 404 });
    }

    await prisma.report.update({
      where: { id: params.id },
      data: { deletedAt: new Date() }
    });

    await prisma.auditLog.create({
      data: {
        firmId: (session.user as any).firmId as string,
        userId: session.user.id as string,
        action: 'DELETE_REPORT',
        metadata: { reportId: params.id },
        ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1'
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error", code: "INTERNAL_ERROR" }, { status: 500 });
  }
}
