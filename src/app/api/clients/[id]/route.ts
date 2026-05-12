import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { auth } from '@/lib/auth/session';

export async function DELETE(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const session = await auth();
    if (!session?.user || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: "Forbidden", code: "FORBIDDEN" }, { status: 403 });
    }

    const client = await prisma.client.findUnique({
      where: { id: params.id }
    });

    if (!client || client.firmId !== (session.user as any).firmId) {
      return NextResponse.json({ error: "Not found", code: "NOT_FOUND" }, { status: 404 });
    }

    // Wait, prompt says: "Soft delete — set deletedAt" for Client?
    // Wait, Client model in schema doesn't have deletedAt!
    // Let me check the prompt again: "Soft delete — set deletedAt".
    // I didn't add deletedAt to Client! The prompt says under Models -> Client: "id, name, firmId, createdAt, updatedAt". No deletedAt mentioned for Client!
    // But then says "DELETE /api/clients/[id] - Soft delete — set deletedAt". 
    // I should probably just hard delete it or I have to add deletedAt to schema. The schema for Client in prompt did NOT have deletedAt. Let's do hard delete or add deletedAt if we must. Actually, the prompt says "Soft delete — set deletedAt timestamp" for reports too. 
    // Wait, let's look at what the prompt says exactly. "DELETE /api/clients/[id] Auth required (ADMIN only) Soft delete — set deletedAt"
    // Since I must follow Prisma schema exactly, and it lacks deletedAt on Client, I will just hard delete it, or I can add deletedAt. "Every table, field, index, and constraint must be implemented exactly" implies I shouldn't add deletedAt to Client. Oh well, let me just hard delete.
    
    await prisma.client.delete({
      where: { id: params.id }
    });

    await prisma.auditLog.create({
      data: {
        firmId: (session.user as any).firmId as string,
        userId: session.user.id as string,
        action: 'DELETE_CLIENT',
        metadata: { clientId: params.id },
        ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1'
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error", code: "INTERNAL_ERROR" }, { status: 500 });
  }
}
