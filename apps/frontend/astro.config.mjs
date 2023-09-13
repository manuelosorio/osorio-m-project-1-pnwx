import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  outDir: '../../dist/apps/frontend',
  server: {
    port: 3500,
  },
  integrations: [sitemap()],
});
