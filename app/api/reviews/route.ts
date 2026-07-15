// GET  /api/reviews — returns all reviews ordered newest first. Called by the Reviews component on page load.
// POST /api/reviews — validates the one-time token, inserts the review, then marks the token as used.
//                     The token is validated server-side here even though it was also checked
//                     client-side via /api/validate-token — never trust the client alone.

import { NextRequest, NextResponse } from 'next/server';
import sql from '@/app/lib/db';

export async function GET() {
  const rows = await sql`
    SELECT * FROM reviews ORDER BY created_at DESC
  `;
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const { token, name, years_enrolled, rating, review } = await req.json();

  if (!token) {
    return NextResponse.json({ error: 'Token required.' }, { status: 400 });
  }
  if (!name || !rating || !review) {
    return NextResponse.json(
      { error: 'Name, rating, and review are required.' },
      { status: 400 }
    );
  }

  const [tokenRow] = await sql`
    SELECT id FROM review_tokens
    WHERE token = ${token} AND used = false AND expires_at > NOW()
  `;

  if (!tokenRow) {
    return NextResponse.json({ error: 'Invalid or expired token.' }, { status: 401 });
  }

  await sql`
    INSERT INTO reviews (name, years_enrolled, rating, review)
    VALUES (${name}, ${years_enrolled ? Number(years_enrolled) : null}, ${Number(rating)}, ${review})
  `;

  await sql`
    UPDATE review_tokens SET used = true WHERE token = ${token}
  `;

  return NextResponse.json({ success: true });
}
