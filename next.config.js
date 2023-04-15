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
      "lh3.googleusercontent.com",
    ],
  },
};

module.exports = nextConfig;
