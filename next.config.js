/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove experimental.appDir as it's now default in Next.js 13+
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig 