const { mergeConfig } = require('vite')
const { default: tsconfigPaths } = require('vite-tsconfig-paths')
const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  features: {
    storyStoreV7: true,
  },

  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [tsconfigPaths()],
      resolve: {
        alias: [
          {
            // Prevent yjs from being imported twice (from its CommonJS and ECMAScript version), by forcing an alias on it
            // More info: https://github.com/yjs/yjs/issues/438
            find: 'yjs',
            replacement: path.resolve(
              __dirname,
              '../node_modules/yjs/dist/yjs.mjs'
            ),
          },
        ],
      },
    })
  },
}
