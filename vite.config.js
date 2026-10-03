import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base is "./" so the build also works on GitHub Pages / any sub-path
export default defineConfig({
  plugins: [react()],
  base: './',
  server: { port: 5173 },
});
