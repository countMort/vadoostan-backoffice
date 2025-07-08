import { hostName } from "@/constants"
import type { NextConfig } from "next"

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
}

export default nextConfig
