import { NextResponse } from 'next/server';

const ORIGIN = process.env.PRESENCE_API_ORIGIN!;
const API_KEY = process.env.PRESENCE_API_KEY!;

export async function GET() {
  const r = await fetch(`${ORIGIN}/api/presence`, {
    headers: { 'x-api-key': API_KEY },
    cache: 'no-store'
  });
  const body = await r.text();
  return new NextResponse(body, {
    status: r.status,
    headers: { 'content-type': r.headers.get('content-type') ?? 'application/json' }
  });
}
