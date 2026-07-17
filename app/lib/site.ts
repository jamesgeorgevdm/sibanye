// Canonical site URL used by sitemap.ts, robots.ts and metadata.
// Defaults to the production domain so absolute URLs (sitemap, JSON-LD) are always
// correct. Override with NEXT_PUBLIC_SITE_URL for preview/local environments
// (e.g. http://localhost:3000).
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sibanyecentre.org"
).replace(/\/+$/, "");
