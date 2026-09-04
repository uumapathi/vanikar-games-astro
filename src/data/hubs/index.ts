/**
 * Copy for the six feature hub pages (/online-card-games etc.), per locale.
 * Each locale file exports the full set; the page component picks the
 * locale and falls back to English if a hub is ever missing.
 */
import type { Locale } from '../../i18n';
import en from './en';
import es from './es';
import pt from './pt';
import fr from './fr';
import de from './de';
import hi from './hi';
import it from './it';
import ja from './ja';

export const HUB_SLUGS = [
  'online-card-games',
  'offline-card-games',
  'multiplayer-card-games',
  'classic-card-games',
  'card-games-against-computer',
  'card-games-with-friends',
] as const;
export type HubSlug = (typeof HUB_SLUGS)[number];

export interface HubSection {
  heading: string;
  body:    string;
  /** Feature not yet live — renders a Coming Soon badge next to the heading */
  soon?:   boolean;
}
export interface HubFaq { q: string; a: string }

export interface HubCopy {
  /** <title> (brand suffix is trimmed automatically when over 60 chars) */
  title:        string;
  /** meta description, ≤160 chars */
  description:  string;
  /** Breadcrumb label */
  crumb:        string;
  h1:           string;
  intro:        string;
  sections:     HubSection[];
  faqs:         HubFaq[];
  gamesHeading: string;
  gamesSub:     string;
}

export type HubSet = Record<HubSlug, HubCopy>;

const HUBS: Record<Locale, HubSet> = { en, es, pt, fr, de, hi, it, ja };

export function hubCopy(slug: HubSlug, locale: Locale): HubCopy {
  return HUBS[locale]?.[slug] ?? en[slug];
}
