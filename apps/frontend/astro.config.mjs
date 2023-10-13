import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import path from "path";



// https://astro.build/config
export default defineConfig({
  outDir: '../../dist/apps/frontend',
  server: {
    port: 3500,
  },
  integrations: [sitemap()],
  experimental: {
    assets: true,
  },
  vite: {
    css: {
      devSourcemap: true,
      // postcss: {
      //   plugins: [require('autoprefixer')],
      // }
    },
    resolve: {
      alias: {
        '@styles/*':  path.resolve('./src/styles/**/*'),
      }
    },
  }
});
