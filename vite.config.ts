import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    allowedHosts: ['55003fe8-0e03-4b93-936e-0392808b880e.lovableproject.com'], // Add this line
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
