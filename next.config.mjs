/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [], // Add any image domains you need
    unoptimized: false
  },
  experimental: {
    serverActions: true
  },
  // Vercel specific optimizations
  poweredByHeader: false,
  compress: true,
  generateEtags: true,
  // Add any other domains you need to fetch from
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          }
        ]
      }
    ]
  }
};

export default nextConfig; 