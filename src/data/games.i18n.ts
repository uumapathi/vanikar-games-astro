import type { Game } from './games';
import type { Locale } from '../i18n';
import type { GameOverlay } from './games.es';
import { gamesEs } from './games.es';
import { gamesPt } from './games.pt';
import { gamesFr } from './games.fr';
import { gamesDe } from './games.de';
import { gamesHi } from './games.hi';

export type { GameOverlay };

/** Per-locale game content overlays; missing locales/fields fall back to English. */
const overlays: Partial<Record<Locale, Record<string, GameOverlay>>> = {
  es: gamesEs,
  pt: gamesPt,
  fr: gamesFr,
  de: gamesDe,
  hi: gamesHi,
};

/** Merge a locale's overlay onto a game; returns the game unchanged when there is none. */
export function localizeGame(game: Game, locale: Locale): Game {
  const overlay = overlays[locale]?.[game.slug];
  return overlay ? { ...game, ...overlay } : game;
}

/**
 * True when a game's page is fully readable in the given locale.
 * English is always complete; other locales count as complete only when the
 * overlay carries the full body content (description onward), not just
 * name/tagline. Incomplete locale pages are noindexed until translated.
 */
export function isGameFullyLocalized(slug: string, locale: Locale): boolean {
  if (locale === 'en') return true;
  const overlay = overlays[locale]?.[slug];
  return !!overlay?.description;
}

/**
 * True when the game's extra FAQs exist in this locale's own words.
 *
 * localizeGame spreads the overlay over the English game, so an untranslated
 * locale would otherwise inherit — and render — the English extraFaqs on an
 * otherwise translated page. Callers use this to append them only when the
 * locale actually has its own.
 */
export function hasLocalizedExtraFaqs(slug: string, locale: Locale): boolean {
  if (locale === 'en') return true;
  return !!overlays[locale]?.[slug]?.extraFaqs?.length;
}
