import { defineConfig } from 'cypress'

import webpackPreprocessor from '@cypress/webpack-preprocessor'

export default defineConfig({
  video: false,
  e2e: {
    specPattern: 'cypress/tests/**/*.ts',
    setupNodeEvents(on, config) {
      const options = {
        webpackOptions: {
          resolve: {
            extensions: ['.ts', '.js'],
          },
          module: {
            rules: [
              {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
              },
            ],
          },
        },
      }

      on('file:preprocessor', webpackPreprocessor(options))

      return config
    },
  },
})
