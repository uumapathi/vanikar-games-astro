/**
 * i18n helpers. English is the default locale and lives at the root
 * (/games, /pricing); Spanish lives under /es/ (/es/games, /es/pricing).
 *
 * Pattern for components: read the locale via `Astro.currentLocale`,
 * then keep en/es copy co-located in the component:
 *
 *   const lang = getLocale(Astro.currentLocale);
 *   const copy = { en: {...}, es: {...} }[lang];
 */

export const LOCALES = ['en', 'es', 'pt', 'fr', 'de', 'hi'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  pt: 'Português',
  fr: 'Français',
  de: 'Deutsch',
  hi: 'हिन्दी',
};

/** Narrow Astro.currentLocale (string | undefined) to a known Locale */
export function getLocale(current: string | undefined): Locale {
  return (LOCALES as readonly string[]).includes(current ?? '')
    ? (current as Locale)
    : DEFAULT_LOCALE;
}

/** Prefix a root-relative path for the given locale: localizePath('/games', 'es') → '/es/games' */
export function localizePath(path: string, locale: Locale): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return clean;
  return clean === '/' ? `/${locale}/` : `/${locale}${clean}`;
}

/** Strip a locale prefix from a pathname: '/es/games' → '/games' */
export function unlocalizePath(pathname: string): string {
  for (const l of LOCALES) {
    if (l === DEFAULT_LOCALE) continue;
    if (pathname === `/${l}` || pathname === `/${l}/`) return '/';
    if (pathname.startsWith(`/${l}/`)) return pathname.slice(l.length + 1);
  }
  return pathname;
}

/**
 * Root-relative paths that exist in every locale. Extend this as pages are
 * translated — the nav, footer, and language switcher use it to decide
 * whether to link to a localized path or fall back to the English page.
 */
export const TRANSLATED_PATHS = new Set<string>(['/', '/games', '/pricing', '/about']);

/** Path prefixes whose entire subtree is translated (e.g. every game detail page) */
export const TRANSLATED_PREFIXES = ['/games/'];

export function isTranslated(path: string): boolean {
  const clean = path !== '/' && path.endsWith('/') ? path.slice(0, -1) : path;
  return TRANSLATED_PATHS.has(clean) || TRANSLATED_PREFIXES.some(p => path.startsWith(p));
}

/** Link helper: localized path when a translation exists, English path otherwise. Preserves #hash. */
export function localizedHref(path: string, locale: Locale): string {
  const [base, hash] = path.split('#');
  const clean = base === '' ? '/' : base;
  const target = isTranslated(clean) ? localizePath(clean, locale) : clean;
  return hash ? `${target}#${hash}` : target;
}

/** Shared chrome strings (nav, footer, common CTAs) */
export const ui = {
  en: {
    'nav.home':      'Home',
    'nav.games':     'Games',
    'nav.community': 'Community',
    'nav.pricing':   'Pricing',
    'nav.privacy':   'Privacy',
    'nav.terms':     'Terms',
    'nav.getApp':    'Get the App',

    'footer.tagline':      'Classic card tables, beautifully reimagined. Play online, practice with AI, and compete in tournaments — all in one app.',
    'footer.waysToPlay':   'Ways to Play',
    'footer.online':       'Online Card Games',
    'footer.multiplayer':  'Multiplayer Card Games',
    'footer.withFriends':  'Card Games with Friends',
    'footer.vsComputer':   'Card Games vs Computer',
    'footer.offline':      'Offline Card Games',
    'footer.classic':      'Classic Card Games',
    'footer.company':      'Company',
    'footer.about':        'About Us',
    'footer.privacy':      'Privacy Policy',
    'footer.terms':        'Terms of Service',
    'footer.support':      'Support',
    'footer.rights':       'All rights reserved.',
    'footer.trademarks':   'Apple, the Apple logo, and App Store are trademarks of Apple Inc. Google Play and the Google Play logo are trademarks of Google LLC. Discord is a trademark of Discord Inc. All other product names, logos, brands, and imagery are the property of their respective owners and are used for identification purposes only; their use does not imply affiliation or endorsement. Vanikar LLC claims no ownership of any third-party trademarks or imagery.',
    'footer.contact':      'Contact',
  },
  es: {
    'nav.home':      'Inicio',
    'nav.games':     'Juegos',
    'nav.community': 'Comunidad',
    'nav.pricing':   'Precios',
    'nav.privacy':   'Privacidad',
    'nav.terms':     'Términos',
    'nav.getApp':    'Descargar App',

    'footer.tagline':      'Mesas de cartas clásicas, bellamente reinventadas. Juega en línea, practica contra la IA y compite en torneos — todo en una sola app.',
    'footer.waysToPlay':   'Formas de jugar',
    'footer.online':       'Juegos de cartas en línea',
    'footer.multiplayer':  'Juegos de cartas multijugador',
    'footer.withFriends':  'Juegos de cartas con amigos',
    'footer.vsComputer':   'Juegos de cartas contra la computadora',
    'footer.offline':      'Juegos de cartas sin conexión',
    'footer.classic':      'Juegos de cartas clásicos',
    'footer.company':      'Compañía',
    'footer.about':        'Quiénes somos',
    'footer.privacy':      'Política de privacidad',
    'footer.terms':        'Términos de servicio',
    'footer.support':      'Soporte',
    'footer.rights':       'Todos los derechos reservados.',
    'footer.trademarks':   'Apple, el logotipo de Apple y App Store son marcas comerciales de Apple Inc. Google Play y el logotipo de Google Play son marcas comerciales de Google LLC. Discord es una marca comercial de Discord Inc. Todos los demás nombres de productos, logotipos, marcas e imágenes pertenecen a sus respectivos propietarios y se usan solo con fines de identificación; su uso no implica afiliación ni respaldo. Vanikar LLC no reclama la propiedad de ninguna marca o imagen de terceros.',
    'footer.contact':      'Contacto',
  },
  pt: {
    'nav.home':      'Início',
    'nav.games':     'Jogos',
    'nav.community': 'Comunidade',
    'nav.pricing':   'Preços',
    'nav.privacy':   'Privacidade',
    'nav.terms':     'Termos',
    'nav.getApp':    'Baixar o app',

    'footer.tagline':      'Mesas de cartas clássicas, lindamente reimaginadas. Jogue online, pratique contra a IA e dispute torneios — tudo em um só app.',
    'footer.waysToPlay':   'Formas de jogar',
    'footer.online':       'Jogos de cartas online',
    'footer.multiplayer':  'Jogos de cartas multijogador',
    'footer.withFriends':  'Jogos de cartas com amigos',
    'footer.vsComputer':   'Jogos de cartas contra o computador',
    'footer.offline':      'Jogos de cartas offline',
    'footer.classic':      'Jogos de cartas clássicos',
    'footer.company':      'Empresa',
    'footer.about':        'Sobre nós',
    'footer.privacy':      'Política de Privacidade',
    'footer.terms':        'Termos de Serviço',
    'footer.support':      'Suporte',
    'footer.rights':       'Todos os direitos reservados.',
    'footer.trademarks':   'Apple, o logotipo da Apple e App Store são marcas registradas da Apple Inc. Google Play e o logotipo do Google Play são marcas registradas da Google LLC. Discord é uma marca registrada da Discord Inc. Todos os demais nomes de produtos, logotipos, marcas e imagens pertencem aos seus respectivos proprietários e são usados apenas para fins de identificação; seu uso não implica afiliação nem endosso. A Vanikar LLC não reivindica a propriedade de nenhuma marca ou imagem de terceiros.',
    'footer.contact':      'Contato',
  },
  fr: {
    'nav.home':      'Accueil',
    'nav.games':     'Jeux',
    'nav.community': 'Communauté',
    'nav.pricing':   'Tarifs',
    'nav.privacy':   'Confidentialité',
    'nav.terms':     'Conditions',
    'nav.getApp':    'Télécharger l’app',

    'footer.tagline':      'Des tables de cartes classiques, magnifiquement réinventées. Jouez en ligne, entraînez-vous contre l’IA et participez à des tournois — le tout dans une seule app.',
    'footer.waysToPlay':   'Façons de jouer',
    'footer.online':       'Jeux de cartes en ligne',
    'footer.multiplayer':  'Jeux de cartes multijoueur',
    'footer.withFriends':  'Jeux de cartes entre amis',
    'footer.vsComputer':   'Jeux de cartes contre l’ordinateur',
    'footer.offline':      'Jeux de cartes hors ligne',
    'footer.classic':      'Jeux de cartes classiques',
    'footer.company':      'Entreprise',
    'footer.about':        'À propos',
    'footer.privacy':      'Politique de confidentialité',
    'footer.terms':        'Conditions d’utilisation',
    'footer.support':      'Assistance',
    'footer.rights':       'Tous droits réservés.',
    'footer.trademarks':   'Apple, le logo Apple et App Store sont des marques d’Apple Inc. Google Play et le logo Google Play sont des marques de Google LLC. Discord est une marque de Discord Inc. Tous les autres noms de produits, logos, marques et visuels appartiennent à leurs propriétaires respectifs et ne sont utilisés qu’à des fins d’identification ; leur usage n’implique aucune affiliation ni approbation. Vanikar LLC ne revendique aucun droit sur les marques ou visuels de tiers.',
    'footer.contact':      'Contact',
  },
  de: {
    'nav.home':      'Start',
    'nav.games':     'Spiele',
    'nav.community': 'Community',
    'nav.pricing':   'Preise',
    'nav.privacy':   'Datenschutz',
    'nav.terms':     'AGB',
    'nav.getApp':    'App holen',

    'footer.tagline':      'Klassische Kartentische, wunderschön neu gedacht. Online spielen, gegen KI üben und in Turnieren antreten — alles in einer App.',
    'footer.waysToPlay':   'Spielmöglichkeiten',
    'footer.online':       'Online-Kartenspiele',
    'footer.multiplayer':  'Multiplayer-Kartenspiele',
    'footer.withFriends':  'Kartenspiele mit Freunden',
    'footer.vsComputer':   'Kartenspiele gegen den Computer',
    'footer.offline':      'Offline-Kartenspiele',
    'footer.classic':      'Klassische Kartenspiele',
    'footer.company':      'Unternehmen',
    'footer.about':        'Über uns',
    'footer.privacy':      'Datenschutzerklärung',
    'footer.terms':        'Nutzungsbedingungen',
    'footer.support':      'Support',
    'footer.rights':       'Alle Rechte vorbehalten.',
    'footer.trademarks':   'Apple, das Apple-Logo und App Store sind Marken von Apple Inc. Google Play und das Google-Play-Logo sind Marken von Google LLC. Discord ist eine Marke von Discord Inc. Alle weiteren Produktnamen, Logos, Marken und Bilder sind Eigentum ihrer jeweiligen Inhaber und dienen nur der Identifikation; ihre Verwendung bedeutet keine Zugehörigkeit oder Befürwortung. Vanikar LLC erhebt keinerlei Anspruch auf Marken oder Bilder Dritter.',
    'footer.contact':      'Kontakt',
  },
  hi: {
    'nav.home':      'होम',
    'nav.games':     'गेम्स',
    'nav.community': 'समुदाय',
    'nav.pricing':   'कीमतें',
    'nav.privacy':   'गोपनीयता',
    'nav.terms':     'शर्तें',
    'nav.getApp':    'ऐप पाएं',

    'footer.tagline':      'क्लासिक कार्ड टेबल, खूबसूरती से नए रूप में। ऑनलाइन खेलें, AI के साथ अभ्यास करें और टूर्नामेंट में मुकाबला करें — सब एक ही ऐप में।',
    'footer.waysToPlay':   'खेलने के तरीके',
    'footer.online':       'ऑनलाइन कार्ड गेम्स',
    'footer.multiplayer':  'मल्टीप्लेयर कार्ड गेम्स',
    'footer.withFriends':  'दोस्तों के साथ कार्ड गेम्स',
    'footer.vsComputer':   'कंप्यूटर के खिलाफ कार्ड गेम्स',
    'footer.offline':      'ऑफलाइन कार्ड गेम्स',
    'footer.classic':      'क्लासिक कार्ड गेम्स',
    'footer.company':      'कंपनी',
    'footer.about':        'हमारे बारे में',
    'footer.privacy':      'गोपनीयता नीति',
    'footer.terms':        'सेवा की शर्तें',
    'footer.support':      'सहायता',
    'footer.rights':       'सर्वाधिकार सुरक्षित।',
    'footer.trademarks':   'Apple, Apple लोगो और App Store, Apple Inc. के ट्रेडमार्क हैं। Google Play और Google Play लोगो, Google LLC के ट्रेडमार्क हैं। Discord, Discord Inc. का ट्रेडमार्क है। अन्य सभी उत्पाद नाम, लोगो, ब्रांड और चित्र अपने-अपने स्वामियों की संपत्ति हैं और केवल पहचान के लिए उपयोग किए गए हैं; इनके उपयोग का अर्थ कोई संबद्धता या समर्थन नहीं है। Vanikar LLC किसी तीसरे पक्ष के ट्रेडमार्क या चित्रों पर कोई अधिकार नहीं जताता।',
    'footer.contact':      'संपर्क',
  },
} as const;

export type UIKey = keyof (typeof ui)['en'];

export function useTranslations(locale: Locale) {
  return (key: UIKey): string => ui[locale][key] ?? ui[DEFAULT_LOCALE][key];
}
