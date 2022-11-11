/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["avatars.githubusercontent.com", "db17gxef1g90a.cloudfront.net"],
  }
}

module.exports = nextConfig
