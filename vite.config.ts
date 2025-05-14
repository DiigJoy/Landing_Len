import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

// https://vitejs.dev/config/
// Configuración optimizada para Node.js 22
const __dirname = fileURLToPath(new URL('.', import.meta.url))
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  // Configuración para servir archivos estáticos
  publicDir: 'public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin/index.html'),
      },
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0', // Needed for Docker
    // Para soporte de netlify-cms en desarrollo local
    proxy: {
      '/.netlify': {
        target: 'http://localhost:8081', // Updated to match netlify-cms-proxy port
        changeOrigin: true,
        secure: false,
      },
    },
  },
})