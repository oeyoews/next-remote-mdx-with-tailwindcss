/** @type {import('next').NextConfig} */

const domains = ["unsplash.com", "plus.unsplash.com", "images.unsplash.com", 'gravatar.com'];

const nextConfig = {
webpack(config, { isServer, dev }) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };
    return config;
  },
  images: {
    domains,
  },
};

module.exports = nextConfig;