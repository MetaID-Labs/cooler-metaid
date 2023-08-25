import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    globals: true,
  },

  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
