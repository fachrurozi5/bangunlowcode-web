import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    dirs: ["app", "components", "features", "lib"],
  },
  experimental: {
    reactCompiler: true,
  },
};

export default nextConfig;
