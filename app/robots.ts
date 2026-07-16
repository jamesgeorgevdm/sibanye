import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/site";

// Served at /robots.txt. Public pages are crawlable; API routes and the
// token-gated review page are excluded from indexing.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/leave-review"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
