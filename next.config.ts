import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Disabilita l'optimizer di Next (usa file statici così come sono)
    unoptimized: true,
    domains: [
      "cdn.sanity.io",
      "theoremz.com",
      "i.ytimg.com",
      "img.youtube.com",
    ],
  },
};

export default nextConfig;
