import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Using webpack (--no-turbopack) for stable CSS resolution with Tailwind v4.
  // Turbopack's workspace root detection conflicts with the project's folder structure.
};

export default nextConfig;
