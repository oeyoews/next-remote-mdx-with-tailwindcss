/** @type {import('next').NextConfig} */

const domains = ["unsplash.com", "plus.unsplash.com", "images.unsplash.com"];

const nextConfig = {
  images: {
    domains,
  },
};

module.exports = nextConfig;