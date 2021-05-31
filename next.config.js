const withPlugins = require('next-compose-plugins');
const withImage = require('next-images');
const webpack = require('webpack');
require('dotenv').config();

const nextConfig = withImage({
  webpack: (config) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        CURRENT_DOMAIN: JSON.stringify(process.env.CURRENT_DOMAIN),
        DOMAIN_URL: JSON.stringify(process.env.DOMAIN_URL),
        API_URL: JSON.stringify(process.env.API_URL),
        CONTENT_URL: JSON.stringify(process.env.CONTENT_URL),
        WEBSOCKET_URL: JSON.stringify(process.env.WEBSOCKET_URL),
        PAY_PAY_CLIENT_ID: JSON.stringify(process.env.PAY_PAY_CLIENT_ID),
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

      config.module.rules.push({
          test: /^(?!.*\.svg$).*\.svg$/,
          loader: 'svg-url-loader',
          options: {
            limit: 10000,
            name: '[path][name].[ext]',
          },
        },
        {
          test: /\.svg$/,
          loader: 'react-svg-loader',
        });
    }

    return config;
  }
});

module.exports = withPlugins(
  [
  ],
  nextConfig
);
