import path from 'path';

const stylesPath = path.resolve('styles');

export default {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'starwars-visualguide.com',
        port: '',
      },
    ],
  },

  webpack: (config, options) => {
    const rules = config.module.rules
      .find(rule => typeof rule.oneOf === 'object')
      .oneOf.filter(rule => Array.isArray(rule.use));

    rules.forEach(rule => {
      rule.use.forEach(moduleLoader => {
        if (
          moduleLoader.loader !== undefined &&
          moduleLoader.loader.includes('css-loader') &&
          typeof moduleLoader.options.modules === 'object'
        ) {
          moduleLoader.options = {
            ...moduleLoader.options,
            modules: {
              ...moduleLoader.options.modules,
              exportLocalsConvention: 'camelCase',
            },
          };
        }
      });
    });

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },

  sassOptions: {
    includePaths: [stylesPath],
    prependData: `@import "mixins.scss"; @import "placeholders.scss"; @import "constants.scss";`,
  },
};
