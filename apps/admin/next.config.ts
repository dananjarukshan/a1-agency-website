import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@a1/types", "@a1/ui", "@a1/database", "@a1/config"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "flagsapi.com",
      },
    ],
  },
};

export default nextConfig;
