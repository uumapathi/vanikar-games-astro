import type { GameOverlay } from './games.es';

/**
 * French overlay for game content, keyed by slug. Any field not present here
 * falls back to the English value from games.ts.
 */
export const gamesFr: Record<string, GameOverlay> = {
  'high-card':      { name: 'Carte haute',    tagline: 'Le jeu de cartes le plus simple — la carte la plus haute gagne.' },
  'go-fish':        { name: 'Go Fish',        tagline: 'Demandez, pêchez et récoltez le plus de familles.' },
  'bluff':          { name: 'Bluff',          tagline: 'Mentez, contestez et débarrassez-vous de vos cartes.' },
  'president':      { name: 'Président',      tagline: 'Grimpez l\'échelle sociale — ou finissez bon dernier.' },
  'war':            { name: 'La Bataille',    tagline: 'Retournez, bataillez et raflez toutes les cartes.' },
  'crazy-eights':   { name: 'Huit américain', tagline: 'Suivez la couleur ou la valeur — les 8 sont toujours des jokers.' },
  'old-maid':       { name: 'Le Pouilleux',   tagline: 'Ne restez pas avec la Dame sans paire.' },
  'sevens':         { name: 'Sevens',         tagline: 'Construisez à partir du 7 — le premier à vider sa main gagne.' },
  'snap':           { name: 'Snap',           tagline: 'Repérez les paires — et criez le premier.' },
  'hearts':         { name: 'Cœurs',          tagline: 'Évitez les cœurs — et gare à la Dame de pique.' },
  'spades':         { name: 'Spades',         tagline: 'Enchérissez malin. Le pique est toujours atout.' },
  'gin-rummy':      { name: 'Gin-rami',       tagline: 'Frappez avant qu\'ils ne le fassent.' },
  'euchre':         { name: 'Euchre',         tagline: 'Choisissez l\'atout. Remportez trois plis. Prouvez votre Right Bower.' },
  'cribbage':       { name: 'Cribbage',       tagline: 'Avancez vos fiches jusqu\'à 121 — chaque combinaison compte.' },
  'canasta':        { name: 'Canasta',        tagline: 'Formez des combinaisons de 7 cartes et sortez le premier.' },
  'buraco':         { name: 'Buraco',         tagline: 'Complétez vos canastas — puis emparez-vous du pot.' },
  'chinchon':       { name: 'Chinchón',       tagline: 'Formez vos suites et vos brelans — le Chinchón clôt la manche instantanément.' },
  'briscola':       { name: 'Briscola',       tagline: 'Prenez les cartes de valeur — l\'atout bat tout le reste.' },
  'truco':          { name: 'Truco',          tagline: 'Bluffez, misez et déjouez — le jeu de cartes de l\'Amérique latine.' },
  'tien-len':       { name: 'Tiến Lên',       tagline: 'Le Big Two du Vietnam — défaussez vos cartes avant tout le monde.' },
  'koi-koi':        { name: 'Koi-Koi',        tagline: 'Associez les fleurs — dites « Koi-Koi » pour tout risquer.' },
  'big-two':        { name: 'Big Two',        tagline: 'Le 2 fait la loi — videz votre main le premier.' },
  'court-piece':    { name: 'Court Piece',    tagline: 'Remportez 7 plis en premier — puis défendez en seconde mi-temps.' },
  'mendikot':       { name: 'Mendikot',       tagline: 'Capturez les quatre 10 — ou empêchez vos adversaires de le faire.' },
  '29-game':        { name: 'Jeu du 29',      tagline: 'Enchérissez jusqu\'à 29 — marquez le plus de points pour remplir votre contrat.' },
  'seep':           { name: 'Seep',           tagline: 'Capturez les cartes correspondantes sur la table — les balayages rapportent gros.' },
  'indian-rummy':   { name: 'Rami indien',    tagline: 'Formez suites et brelans — la suite pure est non négociable.' },
  'indian-jackass': { name: 'Indian Jackass', tagline: 'La Bataille avec un twist — ne restez pas coincé avec les Valets.' },
  'whist':          { name: 'Whist',          tagline: 'L\'ancêtre du Bridge — suivez la couleur et remportez les plis.' },
  'durak':          { name: 'Durak',          tagline: 'Attaquez, défendez — ou soyez le Fou.' },
  'scopa':          { name: 'Scopa',          tagline: 'Balayez la table — le jeu de cartes italien des captures rusées.' },
  'belote':         { name: 'Belote',         tagline: 'Le jeu de cartes national de la France — enchères, atout et Coinche.' },
  'skat':           { name: 'Skat',           tagline: 'Le plus grand jeu de cartes d\'Allemagne — enchérissez, ramassez le Skat et déclarez.' },
};
