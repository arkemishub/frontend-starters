/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  async rewrites() {
    return [{ source: "/next/api/:path*", destination: "/api/:path*" }];
  },
};

module.exports = nextConfig;
