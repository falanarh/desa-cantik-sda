import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://backend-webgis-simoanginangin.vercel.app',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
