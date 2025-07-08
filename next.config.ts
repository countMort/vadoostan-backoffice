import { baseUrl, hostName } from "@/constants";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: hostName,
        port: "", // optional, only if using non-default port
        pathname: "/**", // allow all paths
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Your local proxy endpoint
        destination: `${baseUrl}/api/:path*`, // Target URL
      },
    ];
  },
};

export default nextConfig;
