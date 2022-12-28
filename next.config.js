/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    NEXT_VERSION: require('./package.json').dependencies.next,
    PAGE_VERSION: require('./package.json').version,
  },
  images: {
    unoptimized: true,
    domains: ["avatars.githubusercontent.com", "db17gxef1g90a.cloudfront.net"],
  }
}

module.exports = nextConfig
