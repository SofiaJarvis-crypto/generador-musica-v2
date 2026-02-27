/** @type {import('next').NextConfig} */
const nextConfig = {
  // Expose these to the browser via NEXT_PUBLIC_ prefix
  env: {
    NEXT_PUBLIC_MAX_REGENS: process.env.MAX_REGENS || '3',
    NEXT_PUBLIC_PRECIO_ARS: process.env.PRECIO_ARS || '8900',
  },
  // Disable static optimization to speed up builds
  experimental: {
    isrMemoryCacheSize: 0,
  },
  // Allow audio from Suno CDN in the browser player
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
