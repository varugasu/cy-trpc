import { defineConfig } from 'cypress'

export default defineConfig({
  video: false,
  e2e: {
    specPattern: 'cypress/tests/**/*.ts',
  },
})
