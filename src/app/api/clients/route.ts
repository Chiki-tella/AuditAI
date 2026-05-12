import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
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
    const nameFilter = searchParams.get('name');
    
    const limit = 20;

    const where: any = { firmId: session.user.firmId };
    if (nameFilter) {
      where.name = { contains: nameFilter, mode: 'insensitive' };
    }

    const clients = await prisma.client.findMany({
      where,
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: 'desc' }
    });

    let nextCursor: typeof cursor | undefined = undefined;
    if (clients.length > limit) {
      const nextItem = clients.pop();
      nextCursor = nextItem?.id;
    }

    return NextResponse.json({ data: clients, nextCursor });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error", code: "INTERNAL_ERROR" }, { status: 500 });
  }
}

const CreateClientSchema = z.object({
  name: z.string().min(1)
});

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.user || (session.user as any).role === 'JUNIOR') {
      return NextResponse.json({ error: "Forbidden", code: "FORBIDDEN" }, { status: 403 });
    }

    const body = await req.json();
    const parsed = CreateClientSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", code: "INVALID_INPUT" }, { status: 400 });
    }
    
    const client = await prisma.client.create({
      data: {
        name: parsed.data.name,
        firmId: (session.user as any).firmId
      }
    });
    
    await prisma.auditLog.create({
      data: {
        firmId: (session.user as any).firmId,
        userId: session.user.id,
        action: 'CREATE_CLIENT',
        metadata: { clientId: client.id },
        ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1'
      }
    });

    return NextResponse.json({ data: client });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error", code: "INTERNAL_ERROR" }, { status: 500 });
  }
}
