// GET /api/validate-token?token=<uuid>
// Checks whether the token exists, hasn't been used, and hasn't expired.
// Called by LeaveReviewContent on mount to decide whether to show the form or an error.
// Returning { valid: false } rather than a 401 on invalid tokens means the client
// can check data.valid without also parsing the status code.

import { NextRequest, NextResponse } from 'next/server';
import sql from '@/app/lib/db';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json({ valid: false, error: 'No token provided.' }, { status: 400 });
  }

  const [row] = await sql`
    SELECT id FROM review_tokens
    WHERE token = ${token} AND used = false AND expires_at > NOW()
  `;

  if (!row) {
    return NextResponse.json(
      { valid: false, error: 'This link is invalid or has already been used.' },
      { status: 401 }
    );
  }

  return NextResponse.json({ valid: true });
}
