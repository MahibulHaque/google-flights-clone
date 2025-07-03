// vite.config.ts
import tailwindcss from '@tailwindcss/vite';
import {tanstackRouter} from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths'; // only if you installed the plugin

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // Please make sure that '@tanstack/router-plugin' is passed before '@vitejs/plugin-react'
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
    tsconfigPaths(),
    tailwindcss(),
    // ...,
  ],
  resolve: {
    alias: {
      '@app': '/src/app',
      '@features': '/src//features',
      '@components': '/src/components',
      '@asset': '/src/assets',
      '@core': '/src/core',
    },
  },
});
