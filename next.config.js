/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
// disable: process.env.NODE_ENV === 'development',
disable: false,
})

const domains = ["unsplash.com", "plus.unsplash.com", "images.unsplash.com"];

const nextConfig = {
  images: {
    domains,
  },
};

module.exports = withPWA(nextConfig);
