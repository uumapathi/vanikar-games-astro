import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { isGameFullyLocalized } from './src/data/games.i18n';

// Untranslated locale game pages are noindexed until their overlay carries a
// full translation — keep them out of the sitemap too.
const isUntranslatedGamePage = page => {
  const m = page.match(/^https:\/\/vanikar\.games\/(es|pt|fr|de|hi)\/games\/([^/]+)\/$/);
  return m ? !isGameFullyLocalized(m[2], m[1]) : false;
};

export default defineConfig({
  site: 'https://vanikar.games',
  integrations: [
    sitemap({
      // /join is a one-off invite landing page (noindex) — keep it out of the sitemap.
      filter: page => !page.includes('/join') && !isUntranslatedGamePage(page),
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
