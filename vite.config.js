import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/utravel/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        hotels: resolve(__dirname, 'hotels.html')
      }
    }
  }
});
