import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  /* config options here */
}

export default nextConfig

// Invalid src prop (https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&h=500&fit=crop) on `next/image`, hostname "images.unsplash.com" is not configured under images in your `next.config.js`
// See more info: https://nextjs.org/docs/messages/next-image-unconfigured-host
