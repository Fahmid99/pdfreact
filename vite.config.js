import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import rawPlugin from 'vite-plugin-raw';

export default defineConfig({
  plugins: [
    react(),
    rawPlugin({
      match: /\.txt$/, // Specify the file types you want to include
    }),
  ],
  assetsInclude: ['**/*.txt', '**/*.txt?raw'], // Ensure Vite treats .txt files as assets
});
