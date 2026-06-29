import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// On GitHub Pages the site is served from /portfolio-website/.
// Override with VITE_BASE='/' when deploying to a custom domain or Vercel.
const base = process.env.VITE_BASE ?? '/portfolio-website/';

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          r3f: ['@react-three/fiber', '@react-three/drei', '@react-three/postprocessing'],
          anime: ['animejs'],
        },
      },
    },
  },
});
