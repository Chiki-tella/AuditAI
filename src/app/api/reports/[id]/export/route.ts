import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { auth } from '@/lib/auth/session';

export async function POST(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized", code: "UNAUTHORIZED" }, { status: 401 });
    }

    const report = await prisma.report.findUnique({
      where: { id: params.id },
      include: { client: true, firm: true, issues: true }
    });

    if (!report || report.firmId !== (session.user as any).firmId) {
      return NextResponse.json({ error: "Not found", code: "NOT_FOUND" }, { status: 404 });
    }

    await prisma.auditLog.create({
      data: {
        firmId: (session.user as any).firmId as string,
        userId: session.user.id as string,
        action: 'EXPORT_REPORT',
        metadata: { reportId: params.id },
        ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1'
      }
    });

    const pdfBytes = Buffer.from(`%PDF-1.4 PDF for ${report.firm.name} - ${report.client.name} - ${report.period} - Generated: ${new Date().toISOString()}`);

    return new NextResponse(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="report-${report.id}.pdf"`
      }
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error", code: "INTERNAL_ERROR" }, { status: 500 });
  }
}
