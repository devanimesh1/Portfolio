import { NextRequest, NextResponse } from 'next/server';

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 3600_000 });
    return false;
  }
  entry.count++;
  return entry.count > 5;
}

function sanitize(input: string): string {
  return input.replace(/<[^>]*>/g, '').replace(/[<>"'&]/g, '').slice(0, 500);
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';

  if (rateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many submissions. Please try again later.' },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const { name, email, company, role, industry, timeline, message, preferredContact } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      );
    }

    const sanitizedData = {
      name: sanitize(name),
      email: sanitize(email),
      company: sanitize(company || ''),
      role: sanitize(role || ''),
      industry: sanitize(industry || ''),
      timeline: sanitize(timeline || ''),
      message: sanitize(message),
      preferredContact: preferredContact || 'email',
      timestamp: new Date().toISOString(),
    };

    console.log('Contact form submission:', sanitizedData);

    return NextResponse.json({
      success: true,
      message: 'Message received! Will respond within 24 hours.',
    });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
