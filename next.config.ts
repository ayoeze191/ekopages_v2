import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
