import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  // Shared hosting (cPanel LVE) caps the number of processes an account can
  // spawn. Next.js otherwise defaults to os.cpus().length - 1 worker
  // processes, which can exceed that limit and crash the build with EAGAIN.
  experimental: {
    cpus: 1,
    workerThreads: false,
  },
};

export default withNextIntl(nextConfig);
