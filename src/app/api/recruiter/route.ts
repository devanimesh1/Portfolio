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
  return entry.count > 10;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';

  if (rateLimit(ip)) {
    return NextResponse.json(
      { error: 'Rate limit exceeded.' },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const { jobDescription } = body;

    if (!jobDescription || typeof jobDescription !== 'string') {
      return NextResponse.json(
        { error: 'Job description is required.' },
        { status: 400 }
      );
    }

    if (jobDescription.length > 10000) {
      return NextResponse.json(
        { error: 'Job description too long. Maximum 10,000 characters.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message:
        'Recruiter analysis endpoint ready. Connect Vertex AI for AI-powered JD analysis. Currently using client-side analysis.',
    });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
