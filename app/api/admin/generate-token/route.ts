// POST /api/admin/generate-token — creates a new one-time review link.
// Protected by the ADMIN_SECRET header (x-admin-secret) defined in .env.local.
//
// Usage (curl):
//   curl -X POST https://yoursite.com/api/admin/generate-token \
//     -H "x-admin-secret: <ADMIN_SECRET>" \
//     -H "Content-Type: application/json" \
//     -d '{"event_label": "End of Year 2025", "days_valid": 30}'
//
// Returns { token, url, expires_at } — send the `url` to the family.
// tokens expire automatically and can only be used once (enforced in /api/reviews).

import { NextRequest, NextResponse } from 'next/server';
import sql from '@/app/lib/db';

export async function POST(req: NextRequest) {
  const adminSecret = req.headers.get('x-admin-secret');
  if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const { event_label, days_valid = 30 } = await req.json();
  const expires_at = new Date(
    Date.now() + Number(days_valid) * 24 * 60 * 60 * 1000
  ).toISOString();

  const [row] = await sql`
    INSERT INTO review_tokens (event_label, expires_at)
    VALUES (${event_label || null}, ${expires_at})
    RETURNING token
  `;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const url = `${siteUrl}/leave-review?token=${row.token}`;

  return NextResponse.json({ token: row.token, url, expires_at });
}
