/** @type {import('next').NextConfig} */

const domains = [
  'cdn-icons-png.flaticon.com',
  'unsplash.com',
  'plus.unsplash.com',
  'images.unsplash.com',
  'gravatar.com',
];

const nextConfig = {
  // output: 'export',
  images: {
    domains,
  },
};

module.exports = nextConfig;
