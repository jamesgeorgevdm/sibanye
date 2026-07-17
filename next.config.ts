import type { NextConfig } from "next";

// allowedDevOrigins lets you test on your phone or tablet on the same WiFi network
// while running the dev server — add your local machine's IP here if it changes.
//
// The headers() block applies baseline security headers to every response.
// The CSP is intentionally permissive around inline styles (Tailwind + styled
// SVGs use them) and allows Google's Gemini endpoint, YouTube embeds, and the
// Google Maps iframe used on the contact page. Tighten these if those change.
//
// 'unsafe-eval' is added to script-src ONLY in development, where React/Next need
// eval() for hot reloading and debugging. Production never uses eval(), so it is
// omitted there to keep the policy strict.
const isDev = process.env.NODE_ENV !== "production";

const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "img-src 'self' data: https:",
  "style-src 'self' 'unsafe-inline'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "font-src 'self' data:",
  // In dev, Next uses a websocket for hot module reloading.
  `connect-src 'self' https://generativelanguage.googleapis.com${
    isDev ? " ws: wss:" : ""
  }`,
  "frame-src https://www.google.com https://www.youtube.com https://www.youtube-nocookie.com",
  // Don't force https upgrades in dev (localhost is served over http).
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.0.105", "192.168.0.107"],
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
