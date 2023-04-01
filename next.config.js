/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    domains: [
      "webjems.com",
      "webjems-strapi-assets.s3.amazonaws.com",
      "cms.webjems.com",
      "www.webjems.com",
    ],
  },
};

module.exports = nextConfig;
