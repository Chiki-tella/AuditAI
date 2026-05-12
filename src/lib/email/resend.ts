import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_123');

const withTimeout = <T>(promise: Promise<T>, ms: number): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error('Timeout')), ms))
  ]);
};

export async function sendEmail({ to, subject, html }: { to: string, subject: string, html: string }) {
  try {
    const data = await withTimeout(resend.emails.send({
      from: 'AuditAI <noreply@auditai.com>',
      to,
      subject,
      html,
    }), 10000);
    return { success: true, data };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error };
  }
}
