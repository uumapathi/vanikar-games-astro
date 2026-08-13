import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://vanikar.games',
  integrations: [
    sitemap({
      // /join is a one-off invite landing page (noindex) — keep it out of the sitemap.
      filter: page => !page.includes('/join'),
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', es: 'es', pt: 'pt', fr: 'fr', de: 'de', hi: 'hi' },
      },
    }),
  ],
  output: 'static',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'pt', 'fr', 'de', 'hi'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  build: {
    format: 'directory',   // /privacy → /privacy/index.html
  },
  devToolbar: {
    enabled: false,
  },
});
