/**
 * Single source of truth for launch status.
 *
 * The site must never simultaneously claim the app is "available now" and
 * "launching soon". Every status word and CTA label below is derived from this
 * one flag, so launch day is a one-line change plus a deploy.
 *
 * On launch day: set IS_LAUNCHED to true.
 */
export const IS_LAUNCHED = true;

import type { Locale } from '../i18n';

/** CTA + status wording, keyed by locale, switching on IS_LAUNCHED. */
const COPY = {
  en: {
    pre:  { cta: 'Launching Soon', ctaSecondary: 'Explore the Games', status: 'Launching Soon',
            ready: 'Ready at launch', readyCount: (n: number) => `${n} games ready for launch`,
            notify: 'Get notified at launch',
            gameCta: (g: string) => `Get ${g} at Launch` },
    post: { cta: '⬇ Download Free', ctaSecondary: 'Explore the Games', status: 'Available Now',
            ready: 'Playable today', readyCount: (n: number) => `${n} games available now`,
            notify: 'Download Free',
            gameCta: (g: string) => `Play ${g} Free` },
  },
  es: {
    pre:  { cta: 'Muy pronto', ctaSecondary: 'Explora los juegos', status: 'Muy pronto',
            ready: 'Listos para el lanzamiento', readyCount: (n: number) => `${n} juegos listos para el lanzamiento`,
            notify: 'Avísame en el lanzamiento',
            gameCta: (g: string) => `Consigue ${g} en el lanzamiento` },
    post: { cta: '⬇ Descarga gratis', ctaSecondary: 'Explora los juegos', status: 'Disponible ahora',
            ready: 'Disponibles hoy', readyCount: (n: number) => `${n} juegos disponibles ahora`,
            notify: 'Descarga gratis',
            gameCta: (g: string) => `Juega ${g} gratis` },
  },
  pt: {
    pre:  { cta: 'Em breve', ctaSecondary: 'Explore os jogos', status: 'Em breve',
            ready: 'Prontos para o lançamento', readyCount: (n: number) => `${n} jogos prontos para o lançamento`,
            notify: 'Avise-me no lançamento',
            gameCta: (g: string) => `Garanta ${g} no lançamento` },
    post: { cta: '⬇ Baixe grátis', ctaSecondary: 'Explore os jogos', status: 'Disponível agora',
            ready: 'Jogáveis hoje', readyCount: (n: number) => `${n} jogos disponíveis agora`,
            notify: 'Baixe grátis',
            gameCta: (g: string) => `Jogue ${g} grátis` },
  },
  fr: {
    pre:  { cta: 'Bientôt disponible', ctaSecondary: 'Parcourir les jeux', status: 'Bientôt disponible',
            ready: 'Prêts pour le lancement', readyCount: (n: number) => `${n} jeux prêts pour le lancement`,
            notify: 'Prévenez-moi au lancement',
            gameCta: (g: string) => `Obtenez ${g} au lancement` },
    post: { cta: '⬇ Télécharger gratuitement', ctaSecondary: 'Parcourir les jeux', status: 'Disponible maintenant',
            ready: 'Jouables dès aujourd’hui', readyCount: (n: number) => `${n} jeux disponibles maintenant`,
            notify: 'Télécharger gratuitement',
            gameCta: (g: string) => `Jouez à ${g} gratuitement` },
  },
  de: {
    pre:  { cta: 'Bald verfügbar', ctaSecondary: 'Spiele entdecken', status: 'Bald verfügbar',
            ready: 'Startklar', readyCount: (n: number) => `${n} Spiele startklar`,
            notify: 'Zum Start benachrichtigen',
            gameCta: (g: string) => `${g} zum Start sichern` },
    post: { cta: '⬇ Kostenlos laden', ctaSecondary: 'Spiele entdecken', status: 'Jetzt verfügbar',
            ready: 'Heute spielbar', readyCount: (n: number) => `${n} Spiele jetzt verfügbar`,
            notify: 'Kostenlos laden',
            gameCta: (g: string) => `${g} kostenlos spielen` },
  },
  hi: {
    pre:  { cta: 'जल्द आ रहा है', ctaSecondary: 'गेम देखें', status: 'जल्द आ रहा है',
            ready: 'लॉन्च के लिए तैयार', readyCount: (n: number) => `${n} गेम लॉन्च के लिए तैयार`,
            notify: 'लॉन्च पर सूचित करें',
            gameCta: (g: string) => `लॉन्च पर ${g} पाएँ` },
    post: { cta: '⬇ मुफ़्त डाउनलोड करें', ctaSecondary: 'गेम देखें', status: 'अभी उपलब्ध',
            ready: 'आज ही खेलें', readyCount: (n: number) => `${n} गेम अभी उपलब्ध`,
            notify: 'मुफ़्त डाउनलोड करें',
            gameCta: (g: string) => `${g} मुफ़्त खेलें` },
  },
  it: {
    pre:  { cta: 'In arrivo', ctaSecondary: 'Scopri i giochi', status: 'In arrivo',
            ready: 'Pronto al lancio', readyCount: (n: number) => `${n} giochi pronti al lancio`,
            notify: 'Avvisami al lancio',
            gameCta: (g: string) => `Ottieni ${g} al lancio` },
    post: { cta: '⬇ Scarica gratis', ctaSecondary: 'Scopri i giochi', status: 'Disponibile ora',
            ready: 'Giocabile oggi', readyCount: (n: number) => `${n} giochi disponibili ora`,
            notify: 'Scarica gratis',
            gameCta: (g: string) => `Gioca a ${g} gratis` },
  },
  ja: {
    pre:  { cta: '近日公開', ctaSecondary: 'ゲームを見る', status: '近日公開',
            ready: 'リリース時に利用可能', readyCount: (n: number) => `${n}ゲームがリリース準備完了`,
            notify: 'リリース時にお知らせ',
            gameCta: (g: string) => `リリース時に${g}を入手` },
    post: { cta: '⬇ 無料ダウンロード', ctaSecondary: 'ゲームを見る', status: '利用可能',
            ready: '今すぐ遊べる', readyCount: (n: number) => `${n}ゲームが利用可能`,
            notify: '無料ダウンロード',
            gameCta: (g: string) => `${g}を無料でプレイ` },
  },
} as const;

/** Launch-aware CTA and status wording for a locale. */
export function launchCopy(locale: Locale) {
  return COPY[locale][IS_LAUNCHED ? 'post' : 'pre'];
}
