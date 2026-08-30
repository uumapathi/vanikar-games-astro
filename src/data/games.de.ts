import type { GameOverlay } from './games.es';

/**
 * German overlay for game content, keyed by slug. Any field not present here
 * falls back to the English value from games.ts.
 */
export const gamesDe: Record<string, GameOverlay> = {
  'high-card':      { name: 'Hohe Karte',      tagline: 'Das einfachste Kartenspiel — die höchste Karte gewinnt.' },
  'go-fish':        { name: 'Go Fish',         tagline: 'Fragen, fischen und die meisten Quartette sammeln.' },
  'bluff':          { name: 'Bluff',           tagline: 'Lüge, fordere heraus und werde deine Karten los.' },
  'president':      { name: 'Präsident',       tagline: 'Erklimme die soziale Leiter — oder lande ganz unten.' },
  'war':            { name: 'Krieg',           tagline: 'Aufdecken, kämpfen und alle Karten einsammeln.' },
  'crazy-eights':   { name: 'Mau-Mau',         tagline: 'Passende Farbe oder Zahl legen — die 8 ist immer wild.' },
  'old-maid':       { name: 'Schwarzer Peter', tagline: 'Bleib nicht auf der ungepaarten Dame sitzen.' },
  'sevens':         { name: 'Sevens',          tagline: 'Baue von der 7 aus an — wer zuerst die Hand leert, gewinnt.' },
  'snap':           { name: 'Snap',            tagline: 'Finde die Paare — und rufe zuerst.' },
  'hearts':         { name: 'Hearts',          tagline: 'Meide die Herzen — und hüte dich vor der Pik-Dame.' },
  'spades':         { name: 'Spades',          tagline: 'Reize clever. Pik ist immer Trumpf.' },
  'gin-rummy':      { name: 'Gin Rummy',       tagline: 'Klopfe, bevor es die anderen tun.' },
  'euchre':         { name: 'Euchre',          tagline: 'Bestimme den Trumpf. Hole drei Stiche. Beweise deinen Right Bower.' },
  'cribbage':       { name: 'Cribbage',        tagline: 'Stecke dich bis 121 vor — jede Kombination zählt.' },
  'canasta':        { name: 'Canasta',         tagline: 'Bilde Meldungen aus 7 Karten und gehe zuerst aus.' },
  'buraco':         { name: 'Buraco',          tagline: 'Vervollständige deine Canastas — und schnapp dir den Pott.' },
  'chinchon':       { name: 'Chinchón',        tagline: 'Bilde Reihen und Sätze — Chinchón beendet die Runde sofort.' },
  'briscola':       { name: 'Briscola',        tagline: 'Hol dir die wertvollen Karten — Trumpf schlägt alles andere.' },
  'truco':          { name: 'Truco',           tagline: 'Bluffen, reizen, austricksen — das Kartenspiel Lateinamerikas.' },
  'tien-len':       { name: 'Tiến Lên',        tagline: 'Vietnams Big Two — wirf deine Karten vor allen anderen ab.' },
  'koi-koi':        { name: 'Koi-Koi',         tagline: 'Kombiniere die Blumen — sag „Koi-Koi“ und riskiere alles.' },
  'big-two':        { name: 'Big Two',         tagline: 'Die 2 regiert — leere deine Hand als Erster.' },
  'court-piece':    { name: 'Court Piece',     tagline: 'Gewinne zuerst 7 Stiche — und verteidige in der zweiten Hälfte.' },
  'mendikot':       { name: 'Mendikot',        tagline: 'Sichere dir alle vier Zehnen — oder halte deine Gegner davon ab.' },
  '29-game':        { name: '29 Game',         tagline: 'Reize bis 29 — hole die meisten Punkte, um deinen Kontrakt zu erfüllen.' },
  'indian-rummy':   { name: 'Indian Rummy',    tagline: 'Bilde Folgen und Sätze — eine reine Folge ist Pflicht.' },
  'indian-jackass': { name: 'Indian Jackass',  tagline: 'Wirf alle Karten ab — wer zuletzt Karten hält, verliert.' },
  'whist':          { name: 'Whist',           tagline: 'Der Vorfahre des Bridge — Farbe bedienen und Stiche gewinnen.' },
  'durak':          { name: 'Durak',           tagline: 'Greife an, verteidige — oder sei der Dummkopf.' },
  'scopa':          { name: 'Scopa',           tagline: 'Fege den Tisch leer — Italiens Kartenspiel der schlauen Fänge.' },
  'belote':         { name: 'Belote',          tagline: 'Frankreichs Nationalkartenspiel — reizen, trumpfen und Coinché.' },
  'skat':           { name: 'Skat',            tagline: 'Deutschlands größtes Kartenspiel — reizen, Skat aufnehmen und ansagen.' },
};
