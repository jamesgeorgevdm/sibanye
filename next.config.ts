import type { NextConfig } from "next";

// allowedDevOrigins lets you test on your phone or tablet on the same WiFi network
// while running the dev server — add your local machine's IP here if it changes.
const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.0.105', '192.168.0.107'],
};

export default nextConfig;
