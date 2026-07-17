// GET  /api/reviews — returns all reviews ordered newest first. Called by the Reviews component on page load.
// POST /api/reviews — validates the one-time token, inserts the review, then marks the token as used.
//                     The token is validated server-side here even though it was also checked
//                     client-side via /api/validate-token — never trust the client alone.
//
// Input is validated and length-capped server-side. A per-IP rate limit adds a
// speed bump against automated submission even if a valid token is obtained.

import { NextRequest, NextResponse } from 'next/server';
import sql from '@/app/lib/db';
import { getClientIp, rateLimit } from '@/app/lib/security';

const MAX_LEN = {
  name: 100,
  review: 3000,
};

export async function GET() {
  const rows = await sql`
    SELECT id, name, years_enrolled, rating, review, created_at
    FROM reviews ORDER BY created_at DESC
  `;
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (!rateLimit('reviews', ip, 10, 60 * 60 * 1000)) {
    return NextResponse.json(
      { error: 'Too many attempts. Please try again later.' },
      { status: 429 }
    );
  }

  const { token, name, years_enrolled, rating, review } = await req.json();

  if (!token || typeof token !== 'string') {
    return NextResponse.json({ error: 'Token required.' }, { status: 400 });
  }
  if (!name || !rating || !review) {
    return NextResponse.json(
      { error: 'Name, rating, and review are required.' },
      { status: 400 }
    );
  }
  if (typeof name !== 'string' || typeof review !== 'string') {
    return NextResponse.json({ error: 'Invalid input.' }, { status: 400 });
  }
  if (name.length > MAX_LEN.name || review.length > MAX_LEN.review) {
    return NextResponse.json(
      { error: 'Name or review is too long.' },
      { status: 400 }
    );
  }

  // Rating must be a number in 0.5 steps between 1 and 5.
  const numRating = Number(rating);
  if (
    !Number.isFinite(numRating) ||
    numRating < 1 ||
    numRating > 5 ||
    (numRating * 2) % 1 !== 0
  ) {
    return NextResponse.json({ error: 'Invalid rating.' }, { status: 400 });
  }

  // Years enrolled is optional; when present it must be a sane integer.
  let numYears: number | null = null;
  if (years_enrolled !== undefined && years_enrolled !== null && years_enrolled !== '') {
    numYears = Number(years_enrolled);
    if (!Number.isInteger(numYears) || numYears < 0 || numYears > 100) {
      return NextResponse.json(
        { error: 'Invalid years enrolled.' },
        { status: 400 }
      );
    }
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
    VALUES (${name.trim()}, ${numYears}, ${numRating}, ${review.trim()})
  `;

  await sql`
    UPDATE review_tokens SET used = true WHERE token = ${token}
  `;

  return NextResponse.json({ success: true });
}
