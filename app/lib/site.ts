// Canonical site URL used by sitemap.ts, robots.ts and (later) metadata.
// Set NEXT_PUBLIC_SITE_URL to the real production domain (e.g. https://sibanye.org.za)
// before launch — the localhost fallback is for local development only.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/+$/, "");
