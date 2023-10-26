/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/computeronaldo/TestBlogs/main/images/**",
      },
    ],
  },
};

module.exports = nextConfig;
