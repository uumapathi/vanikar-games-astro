import type { Game } from './games';
import type { Locale } from '../i18n';

/**
 * Spanish overlay for game content, keyed by slug. Any field not present here
 * falls back to the English value from games.ts, so partial translations are
 * safe — translate a game's name/tagline first, then deepen coverage over time.
 */
export type GameOverlay = Partial<Pick<Game,
  'name' | 'tagline' | 'players' | 'description' | 'objective' | 'setup' | 'gameplay' | 'scoring' | 'tips'>>;

export const gamesEs: Record<string, GameOverlay> = {
  'high-card':     { name: 'Carta Alta',    tagline: 'El juego de cartas más simple — gana la carta más alta.' },
  'go-fish':       { name: 'Go Fish',       tagline: 'Pide, pesca y reúne la mayor cantidad de cuartetos.' },
  'bluff':         { name: 'Bluff',         tagline: 'Miente, desafía y deshazte de tus cartas.' },
  'president':     { name: 'Presidente',    tagline: 'Escala la pirámide social — o termina siendo el Plebeyo.' },
  'war':           { name: 'Guerra',        tagline: 'Voltea, batalla y quédate con todas las cartas.' },
  'crazy-eights':  { name: 'Ochos Locos',   tagline: 'Iguala el palo o el número — los 8 siempre son comodines.' },
  'old-maid':      { name: 'La Solterona',  tagline: 'Que no te quedes con la Reina sin pareja.' },
  'sevens':        { name: 'Sietes',        tagline: 'Construye desde el 7 — gana quien vacíe su mano primero.' },
  'snap':          { name: 'Snap',          tagline: 'Iguala las cartas — y grita primero.' },
  'hearts':        {
    name: 'Corazones',
    tagline: 'Evita los corazones — y cuidado con la Reina de Espadas.',
    players: '4 jugadores',
    description: 'Corazones es un clásico juego de evitar bazas: no quieres ganar corazones ni la temida Reina de Espadas (Q♠). Pero si reúnes TODAS las cartas de castigo, "disparas a la luna" y castigas a todos los demás.',
    objective: 'Tener la puntuación más baja cuando un jugador llegue a 100 puntos.',
    setup: [
      'Se usa una baraja estándar de 52 cartas; se reparten 13 a cada uno de los 4 jugadores.',
      'Cada jugador pasa 3 cartas a la izquierda (primera ronda); la dirección rota; en la cuarta ronda no se pasa.',
      'El jugador con el 2♣ abre la primera baza.',
    ],
    gameplay: [
      'Quien abre puede jugar cualquier carta excepto un corazón en la primera baza (salvo que solo tenga corazones).',
      'Los demás deben seguir el palo si pueden; si no, descartan cualquier carta.',
      'La carta más alta del palo jugado gana la baza. No hay triunfo.',
      'No se puede abrir con corazones hasta que "se rompan" — que un corazón haya sido descartado en una baza anterior.',
      'Quien gana la baza abre la siguiente.',
    ],
    scoring: 'Cada ♥ = 1 pt. Q♠ = 13 pts. Las demás = 0. Gana la puntuación más baja. Disparar a la luna: llévate los 13 corazones Y la Q♠ → cada rival recibe 26 pts.',
    tips: [
      'Pasa las espadas altas pronto para no quedarte con la Q♠.',
      'Disparar a la luna es arriesgado pero decisivo — empieza a coleccionar si ya tienes 6+ corazones.',
    ],
  },
  'spades':        { name: 'Espadas',       tagline: 'Apuesta con cabeza. Las espadas siempre son triunfo.' },
  'gin-rummy':     { name: 'Gin Rummy',     tagline: 'Cierra antes de que lo hagan ellos.' },
  'euchre':        { name: 'Euchre',        tagline: 'Nombra el triunfo. Gana tres bazas. Demuestra tu Right Bower.' },
  'cribbage':      { name: 'Cribbage',      tagline: 'Avanza clavijas hasta 121 — cada combinación cuenta.' },
  'canasta':       { name: 'Canasta',       tagline: 'Forma canastas de 7 cartas y cierra primero.' },
  'buraco':        { name: 'Buraco',        tagline: 'Completa tus canastas — y llévate el pozo.' },
  'chinchon':      { name: 'Chinchón',      tagline: 'Forma tus escaleras y grupos — el Chinchón cierra la ronda al instante.' },
  'briscola':      { name: 'Briscola',      tagline: 'Llévate las cartas de más valor — el triunfo vence a todo lo demás.' },
  'truco':         {
    name: 'Truco',
    tagline: 'Miente, apuesta y gana con astucia — el juego de cartas de América Latina.',
    players: '2–4 jugadores',
    description: 'El Truco es un juego de bazas y engaño enormemente popular en Brasil, Argentina y toda América Latina. Su jerarquía única de cartas, sus cantos de apuesta (¡Truco! ¡Retruco! ¡Vale Cuatro!) y las señas entre compañeros lo hacen distinto a cualquier otro juego de cartas.',
    objective: 'Gana el primer jugador o equipo en llegar a 12 puntos (partida corta) o 30 puntos (partida completa).',
    setup: [
      'Se usa una baraja española/de Truco de 40 cartas (quita los 8, los 9 y los comodines de una baraja estándar).',
      'Se reparten 3 cartas a cada jugador. No se declara palo de triunfo; el poder de las cartas sigue la jerarquía fija.',
    ],
    gameplay: [
      'JERARQUÍA DE CARTAS (de mayor a menor): 1♠ > 1♣ > 7♦ > 7♥ > 3 > 2 > 1 (♥/♦) > 12(K) > 11(Q) > 10(J) > 7♠/7♣ > 6 > 5 > 4.',
      'Cada mano tiene hasta 3 bazas (rondas). Gana la mano quien gane 2 de 3.',
      'ENVIDO (apuesta de puntos): se canta antes de la segunda carta de la primera baza. Puntos = suma de las dos cartas más altas del mismo palo + 20.',
      'TRUCO (apuesta de bazas): canta "¡Truco!" en tu turno. El rival puede aceptar (2 pts), subir con "¡Retruco!" (3 pts), subir con "¡Vale Cuatro!" (4 pts) o retirarse.',
      'En parejas, los compañeros pueden usar señas permitidas para comunicar la fuerza de su mano.',
    ],
    scoring: 'Envido ganado: 2 pts (escala con las subidas). Truco ganado: 1–4 pts. Flor (3 cartas del mismo palo): 3 pts automáticos. Gana el primero en llegar a 12 (o 30).',
    tips: [
      'El engaño es central — un "¡Truco!" con mano débil puede ganar si el rival se retira.',
      'Memoriza las 4 cartas más altas: 1♠, 1♣, 7♦, 7♥.',
      'Desarrolla un sistema de señas con tu compañero para indicar la fuerza de la mano.',
    ],
  },
  'tien-len':      { name: 'Tiến Lên',      tagline: 'El Big Two de Vietnam — suelta tus cartas antes que nadie.' },
  'koi-koi':       { name: 'Koi-Koi',       tagline: 'Empareja las flores — di "Koi-Koi" para arriesgarlo todo.' },
  'big-two':       { name: 'Big Two',       tagline: 'Los 2 mandan — corre a vaciar tu mano.' },
  'court-piece':   { name: 'Court Piece',   tagline: 'Gana 7 bazas primero — y defiéndete en la segunda mitad.' },
  'mendikot':      { name: 'Mendikot',      tagline: 'Captura los cuatro 10 — o impide que lo hagan tus rivales.' },
  '29-game':       { name: 'Juego 29',      tagline: 'Apuesta hasta 29 — gana los puntos para cumplir tu contrato.' },
  'seep':          { name: 'Seep',          tagline: 'Captura cartas iguales de la mesa — las barridas dan muchos puntos.' },
  'indian-rummy':  { name: 'Rummy Indio',   tagline: 'Forma escaleras y grupos — la escalera pura no es negociable.' },
  'indian-jackass':{ name: 'Indian Jackass',tagline: 'Suelta todas tus cartas — el último con cartas pierde.' },
  'whist':         { name: 'Whist',         tagline: 'El ancestro del Bridge — sigue el palo y gana bazas.' },
  'durak':         { name: 'Durak',         tagline: 'Ataca, defiende — o sé el Tonto.' },
  'scopa':         { name: 'Scopa',         tagline: 'Barre la mesa — el juego italiano de capturas astutas.' },
  'belote':        { name: 'Belote',        tagline: 'El juego nacional de Francia — apuesta, triunfa y Coinché.' },
  'skat':          { name: 'Skat',          tagline: 'El gran juego de cartas de Alemania — apuesta, levanta el Skat y declara.' },
};

/** Merge the Spanish overlay onto a game; returns the game unchanged for other locales. */
export function localizeGame(game: Game, locale: Locale): Game {
  if (locale !== 'es') return game;
  const overlay = gamesEs[game.slug];
  return overlay ? { ...game, ...overlay } : game;
}
