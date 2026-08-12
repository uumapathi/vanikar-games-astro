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
