import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// ⚠️ IMPORTANTE: base debe coincidir EXACTAMENTE con el nombre del repo en GitHub
export default defineConfig({
  plugins: [react()],
  base: '/brigada-emergencias/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    open: true,
    host: true,
  },
});
