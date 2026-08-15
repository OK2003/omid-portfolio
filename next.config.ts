import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  basePath: process.env.GITHUB_ACTIONS === "true" ? "/omid-portfolio" : "",
  assetPrefix: process.env.GITHUB_ACTIONS === "true" ? "/omid-portfolio/" : undefined,
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
};

export default nextConfig;
