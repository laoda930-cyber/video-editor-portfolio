import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/video-editor-portfolio/' : '/',
  plugins: [react()],
  test: { environment: 'jsdom', setupFiles: './src/test-setup.js' },
})
