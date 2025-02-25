import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url';
import vuetify from 'vite-plugin-vuetify';

export default defineConfig({
  server: {
    host: true,
    base: '/siaefrontend/',
    allowedHosts: ['www.siaeserver.com']
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
