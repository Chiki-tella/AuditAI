import { z } from 'zod';
import { prisma } from '@/lib/db/prisma';
import crypto from 'crypto';
import { sendEmail } from '@/lib/email/resend';
import { NextRequest, NextResponse } from 'next/server';

const RequestSchema = z.object({
  email: z.string().email()
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = RequestSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", code: "INVALID_INPUT" }, { status: 400 });
    }
    
    const { email } = parsed.data;
    
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (user) {
      const token = crypto.randomBytes(32).toString('hex');
      await prisma.verificationToken.create({
        data: {
          userId: user.id,
          token,
          expiresAt: new Date(Date.now() + 60 * 60 * 1000) // 1 hour
        }
      });
      
      await sendEmail({
        to: email,
        subject: 'Password Reset Request',
        html: `<p>Use this token to reset your password: ${token}</p>`
      });
    }
    
    // Always return success to prevent email enumeration
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error", code: "INTERNAL_ERROR" }, { status: 500 });
  }
}
