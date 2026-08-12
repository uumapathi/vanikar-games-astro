import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://vanikar.games',
  integrations: [sitemap()],
  output: 'static',
  build: {
    format: 'directory',   // /privacy → /privacy/index.html
  },
  devToolbar: {
    enabled: false,
  },
});
