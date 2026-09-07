import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { isGameFullyLocalized } from './src/data/games.i18n';
import { games } from './src/data/games';

const GAME_SLUGS = new Set(games.map(g => g.slug));

// The origin differs per environment: production is vanikar.games, the dev
// stack is dev.vanikar.games. Canonicals, hreflang, OG URLs and the sitemap
// all derive from this, so it must match wherever the build is served.
const SITE = process.env.SITE_URL || 'https://vanikar.games';

// Untranslated locale game pages are noindexed until their overlay carries a
// full translation — keep them out of the sitemap too. Game pages now sit at
// /<locale>/cardgames/<slug>/, the same shape as the feature hubs, /pricing
// and /availablegames, so the slug must be checked against the real game list
// before judging it: anything else at that depth is a fully translated page.
const isUntranslatedGamePage = page => {
  const m = page.match(/\/(es|pt|fr|de|hi|it|ja)\/cardgames\/([^/]+)\/$/);
  return m && GAME_SLUGS.has(m[2]) ? !isGameFullyLocalized(m[2], m[1]) : false;
};

export default defineConfig({
  site: SITE,
  integrations: [
    sitemap({
      // /cardgames/join is a one-off invite landing page and /cardgames/ios +
      // /cardgames/android are noindex redirect stubs to the app stores —
      // keep all three out of the sitemap.
      filter: page =>
        !page.includes('/join') &&
        !/\/(ios|android)\/$/.test(page) &&
        !isUntranslatedGamePage(page),
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', es: 'es', pt: 'pt', fr: 'fr', de: 'de', hi: 'hi', it: 'it', ja: 'ja' },
      },
    }),
  ],
  output: 'static',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'pt', 'fr', 'de', 'hi', 'it', 'ja'],
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
