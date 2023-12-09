import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import path from 'path';
import autoprefixer from 'autoprefixer';
import Compress from 'astro-compress';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  outDir: '../../dist/apps/frontend',
  server: {
    port: 3500,
  },
  integrations: [
    react({
      include: ['./src/lib/*']
    }),
    sitemap(),
    Compress({
      Map: true,
      HTML: false,
      CSS: false,
      JS: false,
      SVG: false,
    }),
  ],
  experimental: {
    assets: true,
    viewTransitions: true,
  },
  vite: {
    css: {
      devSourcemap: true,
      postcss: {
        map: {
          inline: true,
        },
        plugins: [autoprefixer()],
      },
    },
    resolve: {
      alias: {
        '@styles/*': path.resolve('./src/styles/**/*'),
      },
    },
  },
});
