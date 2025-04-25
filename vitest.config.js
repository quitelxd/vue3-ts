import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'happy-dom',
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    setupFiles: ['./tests/setup.js'],
    include: ['tests/**/*.spec.js']
  },
}) 