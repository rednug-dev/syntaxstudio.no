import { NextResponse } from 'next/server';

const ORIGIN = process.env.PRESENCE_API_ORIGIN;
const API_KEY = process.env.PRESENCE_API_KEY;

export async function GET() {
  if (!ORIGIN || !API_KEY) {
    console.error("Missing PRESENCE_API_ORIGIN or PRESENCE_API_KEY environment variables");
    return new NextResponse(JSON.stringify({ error: "Configuration error" }), { status: 500 });
  }

  try {
    const r = await fetch(`${ORIGIN}/api/presence`, {
      headers: { 'x-api-key': API_KEY },
      cache: 'no-store'
    });
    const body = await r.text();
    return new NextResponse(body, {
      status: r.status,
      headers: { 'content-type': r.headers.get('content-type') ?? 'application/json' }
    });
  } catch (error) {
    console.error("Error fetching presence:", error);
    return new NextResponse(JSON.stringify({ error: "Failed to fetch presence" }), { status: 500 });
  }
}
