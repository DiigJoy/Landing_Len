import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

// https://vitejs.dev/config/
// Configuración optimizada para Node.js 18
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
      },
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0', // Needed for Docker
  },
  // Importante: Asegurarse de que las variables de entorno estén disponibles
  define: {
    'import.meta.env.VITE_AUTH0_DOMAIN': JSON.stringify(process.env.VITE_AUTH0_DOMAIN),
    'import.meta.env.VITE_AUTH0_CLIENT_ID': JSON.stringify(process.env.VITE_AUTH0_CLIENT_ID),
  }
})