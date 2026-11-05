import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    // Request ke /api diteruskan ke backend Express
    proxy: { '/api': 'http://localhost:3000' },
  },
});
