/**
 * App store links — the single place to edit on launch day.
 *
 * 1. Paste the real App Store and Google Play URLs below.
 * 2. Set STORES_LIVE to true.
 *
 * Until STORES_LIVE is true every store button alerts instead of
 * navigating, so a placeholder URL can never ship as a real link.
 */
export const STORES_LIVE = false;

/** Apple App Store listing, e.g. https://apps.apple.com/app/id1234567890 */
export const APP_STORE_URL = 'https://apps.apple.com/app/idPLACEHOLDER';

/** Google Play listing, e.g. https://play.google.com/store/apps/details?id=games.vanikar */
export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=PLACEHOLDER';

/**
 * The browser version of the game. It is a real URL, so it is a plain link
 * everywhere rather than a gated button.
 *
 * It lives on the `play.` subdomain of whichever host this site is built for:
 * dev.vanikar.games promotes play.dev.vanikar.games and vanikar.games promotes
 * play.vanikar.games, so a dev build can never send a visitor to production or
 * the other way round. SITE comes from SITE_URL via astro.config.mjs; set
 * PUBLIC_WEB_APP_URL to point a one-off build somewhere else.
 */
export const WEB_APP_URL: string =
  import.meta.env.PUBLIC_WEB_APP_URL || `https://play.${new URL(import.meta.env.SITE).host}/`;
