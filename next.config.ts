import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "dist",
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.GITHUB_PAGES === "true" ? "/agentic-architect-dashboard" : undefined,
  basePath: process.env.GITHUB_PAGES === "true" ? "/agentic-architect-dashboard" : undefined,
};

export default nextConfig;
