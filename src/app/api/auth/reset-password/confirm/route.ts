import { z } from 'zod';
import { prisma } from '@/lib/db/prisma';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

const ConfirmSchema = z.object({
  token: z.string(),
  newPassword: z.string().min(8)
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = ConfirmSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", code: "INVALID_INPUT" }, { status: 400 });
    }
    
    const { token, newPassword } = parsed.data;
    
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
      include: { user: true }
    });
    
    if (!verificationToken || verificationToken.used || verificationToken.expiresAt < new Date()) {
      return NextResponse.json({ error: "Invalid or expired token", code: "INVALID_TOKEN" }, { status: 400 });
    }
    
    const passwordHash = await bcrypt.hash(newPassword, 12);
    
    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: verificationToken.userId },
        data: { passwordHash }
      });
      await tx.verificationToken.update({
        where: { id: verificationToken.id },
        data: { used: true }
      });
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error", code: "INTERNAL_ERROR" }, { status: 500 });
  }
}
