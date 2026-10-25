import { NextResponse } from 'next/server';

/**
 * Contact endpoint.
 *
 * Delivery: Resend (https://resend.com). Required environment variables:
 *   RESEND_API_KEY      — API key used to send the email
 *   CONTACT_TO_EMAIL    — inbox that receives enquiries
 *   CONTACT_FROM_EMAIL  — verified sender address (optional, Resend default)
 *
 * Until RESEND_API_KEY and CONTACT_TO_EMAIL are configured the route responds
 * with 503 and the UI tells visitors to email or call the team directly, so
 * the form never pretends a message was delivered.
 */

const ALLOWED_TYPES = [
  'Product enquiry',
  'Partnership',
  'Farmer support',
  'Business enquiry',
  'Farmer story',
  'Other',
] as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+()\d][\d\s()\-.]{5,}$/;

const MAX_MESSAGE_LENGTH = 5000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

/** Lightweight per-instance throttle (documented in the README). */
const recentRequests = new Map<string, number[]>();

function isRateLimited(key: string, now = Date.now()): boolean {
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const history = (recentRequests.get(key) ?? []).filter((time) => time > windowStart);

  if (history.length >= RATE_LIMIT_MAX) {
    recentRequests.set(key, history);
    return true;
  }

  history.push(now);
  recentRequests.set(key, history);

  // Keep the map small on long-running servers.
  if (recentRequests.size > 1000) {
    Array.from(recentRequests.entries()).forEach(([key, times]) => {
      if (times.every((time) => time <= windowStart)) recentRequests.delete(key);
    });
  }
  return false;
}

function badRequest(error: string) {
  return NextResponse.json({ error }, { status: 400 });
}

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many messages from this connection. Please try again shortly.' },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return badRequest('Please submit a valid form.');
  }

  const read = (field: string) =>
    typeof body[field] === 'string' ? (body[field] as string).trim() : '';

  const name = read('name');
  const email = read('email');
  const phone = read('phone');
  const message = read('message');
  const type = read('type');
  const product = read('product');
  const honeypot = read('website');

  // Silently accept spam that trips the honeypot.
  if (honeypot) {
    return NextResponse.json({ message: 'Your message has been sent. The Afrifama team will be in touch.' });
  }

  const failures: string[] = [];
  if (name.length < 2 || name.length > 120) failures.push('full name');
  if (!EMAIL_PATTERN.test(email)) failures.push('email address');
  if (phone && (phone.length > 32 || !PHONE_PATTERN.test(phone))) failures.push('phone number');
  if (message.length < 10 || message.length > MAX_MESSAGE_LENGTH) failures.push('message');
  if (!(ALLOWED_TYPES as readonly string[]).includes(type)) failures.push('inquiry type');
  if (product.length > 60) failures.push('product');

  if (failures.length > 0) {
    return badRequest(`Please check the following field${failures.length > 1 ? 's' : ''}: ${failures.join(', ')}.`);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    return NextResponse.json(
      {
        error:
          'The enquiry form is not connected yet. Please email info@afrifama.com or call +254 716 438 604.',
      },
      { status: 503 }
    );
  }

  const subject = `Website enquiry: ${type}${product ? ` — ${product}` : ''}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || 'Not provided'}`,
    `Inquiry type: ${type}`,
    `Product: ${product || 'Not specified'}`,
    '',
    message,
  ].join('\n');

  try {
    const result = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || 'Afrifama website <onboarding@resend.dev>',
        to: [to],
        reply_to: email,
        subject,
        text,
      }),
    });

    if (!result.ok) {
      return NextResponse.json(
        { error: 'We could not send your message right now. Please email info@afrifama.com.' },
        { status: 502 }
      );
    }

    return NextResponse.json({
      message: 'Your message has been sent. The Afrifama team will be in touch.',
    });
  } catch {
    return NextResponse.json(
      { error: 'We could not send your message right now. Please email info@afrifama.com.' },
      { status: 502 }
    );
  }
}
