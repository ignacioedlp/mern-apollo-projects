/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    URI_GRAPH: process.env.URI_GRAPH,
    JWT_SECRET: process.env.JWT_SECRET,
  },
  // image sources
  images: {
    domains: ['images.unsplash.com'],
  },
}

module.exports = nextConfig
