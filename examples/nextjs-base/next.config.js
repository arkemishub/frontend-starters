/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: "standalone",
  async rewrites() {
    return [{ source: "/next/api/:path*", destination: "/api/:path*" }];
  },
};

module.exports = nextConfig;
