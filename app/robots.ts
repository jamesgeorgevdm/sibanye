import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/site";

// Served at /robots.txt. API routes are not crawlable. The token-gated review
// page remains crawlable so search engines can see its explicit noindex tag.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
