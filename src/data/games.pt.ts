import type { GameOverlay } from './games.es';

/**
 * Brazilian Portuguese overlay for game content, keyed by slug. Any field not
 * present here falls back to the English value from games.ts.
 */
export const gamesPt: Record<string, GameOverlay> = {
  'high-card':      { name: 'Carta Alta',     tagline: 'O jogo de cartas mais simples — a carta mais alta vence.' },
  'go-fish':        { name: 'Go Fish',        tagline: 'Peça, pesque e junte o maior número de quadras.' },
  'bluff':          { name: 'Bluff',          tagline: 'Minta, desafie e livre-se das suas cartas.' },
  'president':      { name: 'Presidente',     tagline: 'Suba na escada social — ou acabe como o Plebeu.' },
  'war':            { name: 'Guerra',         tagline: 'Vire, batalhe e conquiste todas as cartas.' },
  'crazy-eights':   { name: 'Oito Maluco',    tagline: 'Combine o naipe ou o valor — os 8 são sempre curingas.' },
  'old-maid':       { name: 'Mico',           tagline: 'Não fique na mão com a Dama sem par.' },
  'sevens':         { name: 'Sevens',         tagline: 'Construa a partir do 7 — vence quem esvaziar a mão primeiro.' },
  'snap':           { name: 'Snap',           tagline: 'Combine as cartas — e grite primeiro.' },
  'hearts':         { name: 'Copas',          tagline: 'Evite as copas — e cuidado com a Dama de Espadas.' },
  'spades':         { name: 'Espadas',        tagline: 'Aposte com inteligência. Espadas sempre são trunfo.' },
  'gin-rummy':      { name: 'Gin Rummy',      tagline: 'Bata antes que eles batam.' },
  'euchre':         { name: 'Euchre',         tagline: 'Escolha o trunfo. Faça três vazas. Prove o seu Right Bower.' },
  'cribbage':       { name: 'Cribbage',       tagline: 'Avance os pinos até 121 — cada combinação conta.' },
  'canasta':        { name: 'Canasta',        tagline: 'Monte canastras de 7 cartas e bata primeiro.' },
  'buraco':         { name: 'Buraco',         tagline: 'Complete suas canastras — e pegue o morto.' },
  'chinchon':       { name: 'Chinchón',       tagline: 'Forme suas sequências e trincas — o Chinchón fecha a rodada na hora.' },
  'briscola':       { name: 'Briscola',       tagline: 'Leve as cartas de maior valor — o trunfo vence todo o resto.' },
  'truco':          { name: 'Truco',          tagline: 'Blefe, aposte e vença na malandragem — o jogo de cartas da América Latina.' },
  'tien-len':       { name: 'Tiến Lên',       tagline: 'O Big Two do Vietnã — descarte suas cartas antes de todo mundo.' },
  'koi-koi':        { name: 'Koi-Koi',        tagline: 'Combine as flores — diga "Koi-Koi" para arriscar tudo.' },
  'big-two':        { name: 'Big Two',        tagline: 'O 2 manda — corra para esvaziar a mão.' },
  'court-piece':    { name: 'Court Piece',    tagline: 'Vença 7 vazas primeiro — depois defenda na segunda metade.' },
  'mendikot':       { name: 'Mendikot',       tagline: 'Capture os quatro 10 — ou impeça seus adversários de fazer isso.' },
  '29-game':        { name: 'Jogo 29',        tagline: 'Aposte até 29 — faça mais pontos para cumprir o contrato.' },
  'seep':           { name: 'Seep',           tagline: 'Capture cartas iguais da mesa — as varridas valem muitos pontos.' },
  'indian-rummy':   { name: 'Rummy Indiano',  tagline: 'Forme sequências e trincas — a sequência pura é inegociável.' },
  'indian-jackass': { name: 'Indian Jackass', tagline: 'Guerra com uma pegada — não fique preso com os Valetes.' },
  'whist':          { name: 'Whist',          tagline: 'O ancestral do Bridge — siga o naipe e vença as vazas.' },
  'durak':          { name: 'Durak',          tagline: 'Ataque, defenda ou seja o Bobo.' },
  'scopa':          { name: 'Scopa',          tagline: 'Varra a mesa — o jogo de cartas italiano das capturas astutas.' },
  'belote':         { name: 'Belote',         tagline: 'O jogo de cartas nacional da França — aposte, trunfe e Coinché.' },
  'skat':           { name: 'Skat',           tagline: 'O maior jogo de cartas da Alemanha — aposte, pegue o Skat e declare.' },
};
