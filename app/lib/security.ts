// Shared security helpers used across API routes.
//
// NOTE on rate limiting: this is an in-memory limiter keyed by IP. On Vercel's
// serverless runtime each instance has its own memory and the map resets on cold
// start, so this is a best-effort speed bump — enough to stop casual abuse and
// accidental double-submits, not a determined distributed attacker. If abuse
// becomes a real problem, swap `rateLimit` for an Upstash/Redis-backed limiter.

import { NextRequest } from "next/server";

type Bucket = { count: number; resetAt: number };

// One map per limiter "namespace" so different routes don't share counters.
const buckets = new Map<string, Map<string, Bucket>>();

export function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

// Returns true if the request is allowed, false if the caller has exceeded the
// limit for this namespace within the given window.
export function rateLimit(
  namespace: string,
  key: string,
  max: number,
  windowMs: number
): boolean {
  let ns = buckets.get(namespace);
  if (!ns) {
    ns = new Map<string, Bucket>();
    buckets.set(namespace, ns);
  }

  const now = Date.now();
  const entry = ns.get(key);
  if (!entry || now > entry.resetAt) {
    ns.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= max) return false;
  entry.count++;
  return true;
}

// Escapes the five HTML-significant characters so user input can be safely
// embedded in an HTML email body without injecting markup or links.
export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Strips CR/LF (and trims) to prevent email header injection when user input is
// placed into a header like `from` or `subject`. Also caps length defensively.
export function sanitizeHeader(input: string, maxLen = 200): string {
  return input.replace(/[\r\n]+/g, " ").trim().slice(0, maxLen);
}

// Basic email shape check — not RFC-perfect, just enough to reject junk and
// anything containing header-breaking characters.
export function isValidEmail(email: string): boolean {
  if (/[\r\n]/.test(email)) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}
