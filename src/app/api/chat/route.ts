import { NextRequest, NextResponse } from 'next/server';

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60_000;
  const maxRequests = 20;

  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return false;
  }

  entry.count++;
  return entry.count > maxRequests;
}

function sanitizeInput(input: string): string {
  return input
    .replace(/<[^>]*>/g, '')
    .replace(/[<>"'&]/g, '')
    .slice(0, 1000);
}

function detectPromptInjection(input: string): boolean {
  const patterns = [
    /ignore\s+(all\s+)?previous\s+instructions/i,
    /you\s+are\s+now/i,
    /act\s+as\s+(a\s+)?/i,
    /system\s*:\s*/i,
    /\bpretend\b.*\byou\b/i,
    /override\s+your/i,
    /forget\s+(all\s+)?(your\s+)?instructions/i,
  ];
  return patterns.some((p) => p.test(input));
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';

  if (rateLimit(ip)) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Please try again later.' },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const { message } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const sanitized = sanitizeInput(message);

    if (detectPromptInjection(sanitized)) {
      return NextResponse.json({
        response:
          "I can only answer questions about Animesh Pandey's professional background using verified data.",
        sources: [],
      });
    }

    return NextResponse.json({
      response:
        "This endpoint is ready for Vertex AI / Gemini integration. Currently using client-side responses. Connect your Vertex AI credentials to enable AI-powered responses.",
      sources: ['System'],
    });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
