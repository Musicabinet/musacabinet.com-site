const withPlugins = require('next-compose-plugins');
const withImage = require('next-images');
const webpack = require('webpack');
require('dotenv').config();

const nextConfig = {
  webpack: (config) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        CURRENT_DOMAIN: JSON.stringify(process.env.CURRENT_DOMAIN),
        DOMAIN_URL: JSON.stringify(process.env.DOMAIN_URL),
        API_URL: JSON.stringify(process.env.API_URL),
        CONTENT_URL: JSON.stringify(process.env.CONTENT_URL)
      })
    );

    config.plugins.push(
      new webpack.ProvidePlugin({
        Cookies: 'js-cookie'
      })
    );

    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer = [];
    }

    if (!config.module.rules) {
      config.module.rules = [];
    }

    return config;
  }
};

module.exports = withPlugins(
  [
    [withImage],
  ],
  nextConfig
);
