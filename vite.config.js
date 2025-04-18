import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url';
import vuetify from 'vite-plugin-vuetify';

export default defineConfig({
  server: {
    host: true,
    base: '/siaefrontend/',
    allowedHosts: ['www.siaeserver.com'],
    watch: {
      usePolling: true, // força Vite a "escutar" mudanças mesmo em Windows ou VSCode
      interval: 100
    }
  },
  plugins: [
    vue(),
    vuetify({ autoImport: true }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)), // Define @ como src/
    },
  },
  base: '/siaefrontend/',  // Caminho base para o GitHub Pages
});
