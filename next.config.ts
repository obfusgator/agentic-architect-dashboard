import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.DOCKER_BUILD === "true" ? "standalone" : "export",
  distDir: process.env.DOCKER_BUILD === "true" ? ".next" : "dist",
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.GITHUB_PAGES === "true" ? "/agentic-architect-dashboard" : undefined,
  basePath: process.env.GITHUB_PAGES === "true" ? "/agentic-architect-dashboard" : undefined,
};

export default nextConfig;
