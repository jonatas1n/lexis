import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const API_URL="http://localhost:8000";
const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    proxy: {
      '/api': {
        target: API_URL || 'http://api:8000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})
