import { z } from 'zod';
import { prisma } from '@/lib/db/prisma';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { sendEmail } from '@/lib/email/resend';
import { NextRequest, NextResponse } from 'next/server';

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string(),
  firmName: z.string()
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = RegisterSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", code: "INVALID_INPUT" }, { status: 400 });
    }
    
    const { email, password, name, firmName } = parsed.data;
    
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Email already exists", code: "USER_EXISTS" }, { status: 400 });
    }
    
    const passwordHash = await bcrypt.hash(password, 12);
    
    const user = await prisma.$transaction(async (tx) => {
      const firm = await tx.firm.create({
        data: {
          name: firmName,
          scansLimit: 3
        }
      });
      
      return tx.user.create({
        data: {
          email,
          passwordHash,
          name,
          role: 'ADMIN',
          firmId: firm.id
        }
      });
    });
    
    const token = crypto.randomBytes(32).toString('hex');
    await prisma.verificationToken.create({
      data: {
        userId: user.id,
        token,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
      }
    });
    
    await sendEmail({
      to: email,
      subject: 'Welcome to AuditAI',
      html: `<p>Welcome! Please verify your email with token: ${token}</p>` // In real app, link to frontend
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error", code: "INTERNAL_ERROR" }, { status: 500 });
  }
}
