import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cover images can come from Firebase Storage or any pasted URL, so we render
  // them with plain <img loading="lazy"> (see ImageField / WorkList) rather than
  // next/image — that keeps arbitrary hosts working without remotePatterns config.
  reactStrictMode: true,
};

export default nextConfig;
