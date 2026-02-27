/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js automatically exposes NEXT_PUBLIC_* variables to the browser
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
