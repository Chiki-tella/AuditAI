import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { auth } from '@/lib/auth/session';
import { z } from 'zod';

const ResolveSchema = z.object({
  resolved: z.boolean(),
  resolutionNote: z.string().optional()
});

export async function PATCH(req: NextRequest, props: { params: Promise<{ id: string, issueId: string }> }) {
  const params = await props.params;
  try {
    const session = await auth();
    if (!session?.user || (session.user as any).role === 'JUNIOR') {
      return NextResponse.json({ error: "Forbidden", code: "FORBIDDEN" }, { status: 403 });
    }

    const body = await req.json();
    const parsed = ResolveSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", code: "INVALID_INPUT" }, { status: 400 });
    }
    
    const { resolved, resolutionNote } = parsed.data;
    
    if (resolved && !resolutionNote) {
      return NextResponse.json({ error: "resolutionNote is required when resolved = true", code: "MISSING_RESOLUTION_NOTE" }, { status: 400 });
    }

    const report = await prisma.report.findUnique({ where: { id: params.id } });
    if (!report || report.firmId !== (session.user as any).firmId) {
      return NextResponse.json({ error: "Not found", code: "NOT_FOUND" }, { status: 404 });
    }

    const issue = await prisma.issue.findUnique({ where: { id: params.issueId } });
    if (!issue || issue.reportId !== params.id) {
      return NextResponse.json({ error: "Issue not found", code: "NOT_FOUND" }, { status: 404 });
    }

    const updatedIssue = await prisma.issue.update({
      where: { id: params.issueId },
      data: {
        resolved,
        resolutionNote: resolved ? resolutionNote : null
      }
    });

    await prisma.auditLog.create({
      data: {
        firmId: (session.user as any).firmId as string,
        userId: session.user.id as string,
        action: 'RESOLVE_ISSUE',
        metadata: { issueId: params.issueId, resolved },
        ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1'
      }
    });

    return NextResponse.json({ data: updatedIssue });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error", code: "INTERNAL_ERROR" }, { status: 500 });
  }
}
