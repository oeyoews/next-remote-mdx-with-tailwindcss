/** @type {import('next').NextConfig} */

const domains = [
  'unsplash.com',
  'plus.unsplash.com',
  'images.unsplash.com',
  'gravatar.com',
];

const nextConfig = {
  images: {
    domains,
  },
};

module.exports = nextConfig;
