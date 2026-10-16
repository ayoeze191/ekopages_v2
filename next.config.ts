import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // API paths end in a slash (Django APPEND_SLASH); without this Next 308s
  // /api/proxy/foo/ to /api/proxy/foo and the upstream path breaks.
  skipTrailingSlashRedirect: true,
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "ekopages1.s3.amazonaws.com" },
    ],
  },
};

export default nextConfig;
