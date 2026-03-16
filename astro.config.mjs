import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://cineindustria.com',
  integrations: [sitemap(), mdx()],
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name].[hash][extname]',
        },
      },
    },
  },
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
