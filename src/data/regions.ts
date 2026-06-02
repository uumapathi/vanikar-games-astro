export type Region = 'Universal' | 'North America' | 'Latin America' | 'Asia' | 'India' | 'EU';

export const regionMeta: Record<Region, { label: string; flag: string; langs: string }> = {
  'Universal':     { label: 'Universal',     flag: '🌍', langs: 'en' },
  'North America': { label: 'North America', flag: '🌎', langs: 'en, fr, es' },
  'Latin America': { label: 'Latin America', flag: '🌎', langs: 'es, pt' },
  'Asia':          { label: 'Asia',          flag: '🌏', langs: 'zh, ja, ko, vi, th, id, tl' },
  'India':         { label: 'India',         flag: '🇮🇳', langs: 'hi, ta, te, bn, mr, gu, pa, ml, kn' },
  'EU':            { label: 'Europe',        flag: '🇪🇺', langs: 'fr, de, it, ru, el, bg, es, nl, pl, tr' },
};

export const allRegions: Region[] = [
  'North America', 'Latin America', 'Asia', 'India', 'EU',
];

export interface Language {
  code:   string;  // ISO 639-1 / BCP-47
  name:   string;  // English name
  native: string;  // Name in that language
}

/** Shared language lookup — import specific ones as needed */
export const LANG: Record<string, Language> = {
  en:    { code: 'en',    name: 'English',               native: 'English' },
  hi:    { code: 'hi',    name: 'Hindi',                 native: 'हिन्दी' },
  ta:    { code: 'ta',    name: 'Tamil',                 native: 'தமிழ்' },
  te:    { code: 'te',    name: 'Telugu',                native: 'తెలుగు' },
  bn:    { code: 'bn',    name: 'Bengali',               native: 'বাংলা' },
  mr:    { code: 'mr',    name: 'Marathi',               native: 'मराठी' },
  gu:    { code: 'gu',    name: 'Gujarati',              native: 'ગુજરાતી' },
  pa:    { code: 'pa',    name: 'Punjabi',               native: 'ਪੰਜਾਬੀ' },
  ml:    { code: 'ml',    name: 'Malayalam',             native: 'മലയാളം' },
  kn:    { code: 'kn',    name: 'Kannada',               native: 'ಕನ್ನಡ' },
  ur:    { code: 'ur',    name: 'Urdu',                  native: 'اُردُو' },
  'zh-CN': { code: 'zh-CN', name: 'Chinese (Simplified)',  native: '简体中文' },
  'zh-TW': { code: 'zh-TW', name: 'Chinese (Traditional)', native: '繁體中文' },
  ja:    { code: 'ja',    name: 'Japanese',              native: '日本語' },
  ko:    { code: 'ko',    name: 'Korean',                native: '한국어' },
  vi:    { code: 'vi',    name: 'Vietnamese',            native: 'Tiếng Việt' },
  th:    { code: 'th',    name: 'Thai',                  native: 'ภาษาไทย' },
  tl:    { code: 'tl',    name: 'Filipino',              native: 'Filipino' },
  id:    { code: 'id',    name: 'Indonesian',            native: 'Bahasa Indonesia' },
  es:    { code: 'es',    name: 'Spanish',               native: 'Español' },
  pt:    { code: 'pt',    name: 'Portuguese',            native: 'Português' },
  fr:    { code: 'fr',    name: 'French',                native: 'Français' },
  de:    { code: 'de',    name: 'German',                native: 'Deutsch' },
  it:    { code: 'it',    name: 'Italian',               native: 'Italiano' },
  ru:    { code: 'ru',    name: 'Russian',               native: 'Русский' },
  uk:    { code: 'uk',    name: 'Ukrainian',             native: 'Українська' },
  el:    { code: 'el',    name: 'Greek',                 native: 'Ελληνικά' },
  bg:    { code: 'bg',    name: 'Bulgarian',             native: 'Български' },
  ar:    { code: 'ar',    name: 'Arabic',                native: 'العربية' },
  nl:    { code: 'nl',    name: 'Dutch',                 native: 'Nederlands' },
  pl:    { code: 'pl',    name: 'Polish',                native: 'Polski' },
  tr:    { code: 'tr',    name: 'Turkish',               native: 'Türkçe' },
};
