import type { NextConfig } from "next";

// GitHub Pages serves a user site (gaurikadiwan.github.io) from the root.
// For a project site (e.g. /portfolio), set NEXT_PUBLIC_BASE_PATH=/portfolio at build time.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
