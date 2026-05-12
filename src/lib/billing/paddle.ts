import crypto from "crypto";

export async function verifyPaddleWebhook(signature: string | null, body: string, secret: string): Promise<boolean> {
  if (!signature || !secret) return false;
  
  const parts = signature.split(';');
  const tsPart = parts.find(p => p.startsWith('ts='));
  const h1Part = parts.find(p => p.startsWith('h1='));
  
  if (!tsPart || !h1Part) return false;
  
  const ts = tsPart.split('=')[1];
  const h1 = h1Part.split('=')[1];
  
  const payload = `${ts}:${body}`;
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(payload);
  const expectedHmac = hmac.digest('hex');
  
  try {
    return crypto.timingSafeEqual(Buffer.from(expectedHmac), Buffer.from(h1));
  } catch (e) {
    return false;
  }
}
