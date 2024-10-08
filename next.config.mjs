/** @type {import('next').NextConfig} */
import withPlaiceholder from "@plaiceholder/next";

const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'placehold.co',
          },
        ],
      },
      eslint: {
        ignoreDuringBuilds: true
      }
};

export default withPlaiceholder(nextConfig);