/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["m.media-amazon.com","burst.shopifycdn.com"],
  },
  hostname: "burst.shopifycdn.com"
}

module.exports = nextConfig
