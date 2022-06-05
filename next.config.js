/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  reactStrictMode: true,
};
module.exports = {
  images: {
    loader: "akamai",
    path: "",
    domains: ["res.cloudinary.com"],
  },
  nextConfig,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};
