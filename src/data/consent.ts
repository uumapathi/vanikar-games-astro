/**
 * Analytics consent.
 *
 * The decision lives in localStorage rather than a cookie: storing it is
 * strictly necessary either way, but keeping it out of the cookie jar means
 * nothing about it travels to the server on every request.
 *
 * Read by two places that must agree — the loader in BaseLayout, which decides
 * whether to emit the Google tag at all, and the banner that writes the
 * choice — so the key is defined once here.
 */
export const CONSENT_KEY = 'vk-analytics-consent';

/** Values stored under CONSENT_KEY. Anything else is treated as "not asked yet". */
export const GRANTED = 'granted';
export const DENIED = 'denied';

/**
 * Where consent has to be asked for, decided from the browser's IANA timezone.
 *
 * The site is pre-rendered onto a CDN and SWA routes cannot match on country,
 * so there is no server-side step that could vary the page by geography. The
 * alternative — a geo-IP lookup — would send every visitor's IP to a third
 * party in order to decide whether we are allowed to track them, which is a
 * worse trade than the accuracy it buys.
 *
 * The lists deliberately over-reach. Sweeping in a Swiss or Turkish visitor
 * costs a banner nobody strictly needed; missing a real EU visitor means
 * loading Google Analytics on them without consent, which is the whole thing
 * we are avoiding. An unreadable or unrecognised timezone counts as in-scope
 * for the same reason.
 *
 * Accurate to the limits of the signal: a VPN or a trip abroad will misplace
 * someone in either direction. If the zone ever moves behind Cloudflare,
 * CF-IPCountry replaces this with a real answer.
 */
export const CONSENT_REGION_PREFIXES = [
  'Europe/',    // EU + EEA + UK, plus non-EU neighbours we are happy to include
  'Atlantic/',  // Canaries, Madeira, Azores, Reykjavik — EU/EEA soil
  'Arctic/',    // Longyearbyen (Svalbard, Norway)
];

/** EU outermost regions whose timezones sit outside the prefixes above. */
export const CONSENT_REGION_ZONES = [
  'America/Cayenne',        // French Guiana
  'America/Guadeloupe',
  'America/Martinique',
  'America/Marigot',        // Saint-Martin
  'America/St_Barthelemy',
  'Indian/Reunion',
  'Indian/Mayotte',
];
