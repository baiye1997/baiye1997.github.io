// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://baiye1997.github.io',
  output: 'static',
  vite: {
    plugins: [tailwindcss()]
  }
});
