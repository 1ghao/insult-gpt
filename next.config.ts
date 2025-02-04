import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: false,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  distDir: "dist",
};

export default nextConfig;
