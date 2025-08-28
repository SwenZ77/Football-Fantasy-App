/* eslint-env node */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
  // eslint-disable-next-line no-undef
    'import.meta.env.BACKEND_API_URL': JSON.stringify(process.env.BACKEND_API_URL || ''),
  },
  server: {
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
})
