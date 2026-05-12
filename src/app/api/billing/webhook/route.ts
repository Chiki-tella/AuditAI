import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { verifyPaddleWebhook } from '@/lib/billing/paddle';
import { sendEmail } from '@/lib/email/resend';

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get('paddle-signature');
    const body = await req.text();
    
    const isValid = await verifyPaddleWebhook(signature, body, process.env.PADDLE_WEBHOOK_SECRET || 'secret');
    if (!isValid) {
      return NextResponse.json({ error: "Unauthorized", code: "UNAUTHORIZED" }, { status: 401 });
    }
    
    const event = JSON.parse(body);
    
    if (event.event_type === 'subscription.activated') {
      const subscription_id = event.data.id || event.data.subscription_id;
      const firmId = event.data.custom_data?.firmId;
      if (firmId) {
        await prisma.subscription.upsert({
          where: { firmId },
          update: {
            paddleSubId: subscription_id,
            status: 'ACTIVE',
            currentPeriodEnd: new Date(event.data.current_billing_period?.ends_at || Date.now() + 30 * 24 * 3600000)
          },
          create: {
            firmId,
            paddleSubId: subscription_id,
            status: 'ACTIVE',
            currentPeriodEnd: new Date(event.data.current_billing_period?.ends_at || Date.now() + 30 * 24 * 3600000)
          }
        });
      }
    } else if (event.event_type === 'subscription.canceled' || event.event_type === 'subscription.cancelled') {
      const subscription_id = event.data.id || event.data.subscription_id;
      await prisma.subscription.updateMany({
        where: { paddleSubId: subscription_id },
        data: { status: 'CANCELLED' }
      });
    } else if (event.event_type === 'transaction.payment_failed' || event.event_type === 'payment.failed') {
      const subscription_id = event.data.subscription_id;
      const subs = await prisma.subscription.findMany({
        where: { paddleSubId: subscription_id },
        include: { firm: { include: { users: { where: { role: 'ADMIN' } } } } }
      });
      if (subs.length > 0) {
        const sub = subs[0];
        await prisma.subscription.update({
          where: { id: sub.id },
          data: { status: 'PAST_DUE' }
        });
        if (sub.firm.users.length > 0) {
          await sendEmail({
            to: sub.firm.users[0].email,
            subject: 'Payment Failed',
            html: '<p>Your recent payment failed. Please update your billing details.</p>'
          });
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error", code: "INTERNAL_ERROR" }, { status: 500 });
  }
}
