import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

const githubPagesBase = '/jeju-pixelflip-pre/'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.GITHUB_PAGES === 'true' ? githubPagesBase : '/',
  plugins: [react()],
  test: {
    include: ['src/**/*.test.{ts,tsx}'],
  },
})
