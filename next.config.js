/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  reactStrictMode: true,
};
module.exports = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  nextConfig,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};
