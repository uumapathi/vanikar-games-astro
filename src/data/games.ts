import { LANG } from './regions';
import type { Region, Language } from './regions';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type { Region, Language };

export interface Game {
  slug:           string;
  name:           string;
  alternateNames?: string[];
  tagline:        string;
  icon:           string;
  players:        string;
  playerCount:    string;
  difficulty:     Difficulty;
  premium:        boolean;
  /** Not yet released — shown in catalog with Coming Soon badge */
  comingSoon?:    boolean;
  /** Primary regions — used for filtering on the Games page */
  regions:        Region[];
  /** App UI languages for this game */
  languages:      Language[];
  description:    string;
  objective:      string;
  setup:          string[];
  gameplay:       string[];
  scoring:        string;
  tips:           string[];
}

/* ─────────────────────────────────────────────────────────────────────────────
   UNIVERSAL — standard across all regions
   ───────────────────────────────────────────────────────────────────────────── */
const universalGames: Game[] = [
  {
    slug: 'high-card',
    name: 'High Card',
    tagline: 'The simplest card game — highest card wins.',
    icon: '🂡',
    players: '2–4 players', playerCount: '2–4',
    difficulty: 'Easy', premium: false,
    regions: ['Universal'],
    languages: [LANG.en, LANG.hi, LANG['zh-CN'], LANG.es, LANG.fr, LANG.de, LANG.pt, LANG.ja, LANG.ar],
    description: 'High Card is the perfect introduction to card games. Each round every player simultaneously reveals one card; the player with the highest card wins all cards played that round. Simple, fast, and endlessly replayable.',
    objective: 'Collect the most cards by the time the deck runs out.',
    setup: [
      'Shuffle a standard 52-card deck.',
      'Deal all cards face-down equally among players.',
      'Each player holds their stack face-down without looking.',
    ],
    gameplay: [
      'All players simultaneously flip the top card of their stack to the centre.',
      'The player whose card has the highest rank wins all the cards played that turn.',
      'In a tie, all tied players flip one more card — highest of those wins everything.',
      'Won cards are added to the bottom of the winner\'s stack.',
      'Play continues until one player has all the cards or a set number of rounds is reached.',
    ],
    scoring: 'The player who collects the most cards wins.',
    tips: [
      'No strategy exists in the base game — great for younger players.',
      'Try the memory variant: keep a face-up discard pile to track which high cards have appeared.',
    ],
  },
  {
    slug: 'go-fish',
    name: 'Go Fish',
    tagline: 'Ask, fish, and collect the most books.',
    icon: '🐟',
    players: '2–6 players', playerCount: '2–6',
    difficulty: 'Easy', premium: false,
    regions: ['Universal'],
    languages: [LANG.en, LANG['zh-CN'], LANG.ja, LANG.ko, LANG.hi, LANG.es, LANG.fr, LANG.pt, LANG.de],
    description: 'Go Fish is a classic card game loved by players of all ages. Ask opponents for cards you need, build complete sets of four (books), and collect the most books to win.',
    objective: 'Collect the most books — complete sets of all 4 cards of the same rank.',
    setup: [
      'Use a standard 52-card deck. 2 players: deal 7 cards each. 3–6 players: deal 5 cards each.',
      'Place remaining cards face-down as the "ocean" or "pond."',
    ],
    gameplay: [
      'Ask any one opponent for a rank you already hold at least one of (e.g., "Do you have any Kings?").',
      'If they do, they give you ALL cards of that rank and you take another turn.',
      'If not, they say "Go Fish!" — draw one card from the ocean. Your turn ends unless you drew the asked rank.',
      'When you collect all 4 of a rank, place the complete book face-up in front of you.',
      'Play continues until the ocean is empty and no more books can be formed.',
    ],
    scoring: 'Player with the most books wins.',
    tips: [
      'Pay attention to what opponents ask for — it reveals their holdings.',
      'Ask for ranks you already hold 2 or 3 of to complete books faster.',
    ],
  },
  {
    slug: 'bluff',
    name: 'Bluff',
    alternateNames: ['Cheat', 'BS', 'I Doubt It', 'Liar'],
    tagline: 'Lie, challenge, and get rid of your cards.',
    icon: '🎭',
    players: '3–8 players', playerCount: '3–8',
    difficulty: 'Easy', premium: false,
    regions: ['Universal', 'India'],
    languages: [LANG.en, LANG.hi, LANG.mr, LANG.bn, LANG['zh-CN'], LANG.ru, LANG.de, LANG.fr, LANG.es, LANG.pt],
    description: 'Bluff (also known as Cheat, BS, or I Doubt It) is a deceptive shedding game. You must play cards face-down claiming a specific rank — but you can lie. Anyone can call you out, making every turn electric.',
    objective: 'Be the first to get rid of all your cards.',
    setup: [
      'Deal all cards face-down equally. Players look only at their own hands.',
      'The rank sequence cycles: 2, 3, 4…A, then back to 2.',
    ],
    gameplay: [
      'On your turn, play 1–4 cards face-down and announce the rank (must be the current rank in sequence). You may lie.',
      'Any player may immediately call "Bluff!" after a play.',
      'If challenged: flip the cards. If any card doesn\'t match the claim, the player who played takes the entire pile. If all match, the challenger takes it.',
      'If no one challenges, the cards stay in the pile and play passes clockwise.',
      'First to empty their hand wins.',
    ],
    scoring: 'First player to play their last card and survive any immediate challenge wins.',
    tips: [
      'Bluff on high cards (Kings, Aces) once many have been played.',
      'Don\'t challenge every play — save accusations for large piles.',
      'Very fast players are often telling the truth (or very skilled liars).',
    ],
  },
  {
    slug: 'president',
    name: 'President',
    alternateNames: ['Daifugō', 'Scum', 'Asshole', 'Rich Man Poor Man', 'Satte Pe Satta (Indian variant)'],
    tagline: 'Climb the social ladder — or end up the Scum.',
    icon: '👑',
    players: '3–7 players', playerCount: '3–7',
    difficulty: 'Easy', premium: false,
    regions: ['Universal', 'Asia', 'India'],
    languages: [LANG.en, LANG.ja, LANG.ko, LANG['zh-CN'], LANG.hi, LANG.fr, LANG.de, LANG.ru, LANG.es, LANG.vi],
    description: 'President (Daifugō in Japan, Scum or Asshole in the US) is a shedding game where players race to empty their hands. Finishing order determines a pecking order for the next round, with mandatory card trades between top and bottom players.',
    objective: 'Be the first to get rid of all your cards and become President.',
    setup: [
      'Deal all cards evenly (extras go to the player left of the dealer).',
      'From the 2nd round on: Scum gives their best card(s) to the President; President gives back any card(s).',
    ],
    gameplay: [
      'The player with the 3♣ (or lowest card) plays first.',
      'Play moves clockwise. Each player must play the same card type (single, pair, triple) but HIGHER than the previous play, or pass.',
      'When all others pass, the last player to play starts a new round with any combination.',
      'The first player to empty their hand is the President; the last is the Scum.',
    ],
    scoring: 'Finishing order: 1st = President, last = Scum. Roles determine the card-trade handicap for the next round. Most President titles wins.',
    tips: [
      'Save 2s and Aces — they are the highest singles.',
      'Playing four of a kind resets the round and lets you play again.',
      'As Scum you\'re always handing your best cards away — escape quickly.',
    ],
  },
  {
    slug: 'war',
    name: 'War',
    alternateNames: ['Battle', 'Bataille (French)'],
    tagline: 'Flip, battle, and collect every card.',
    icon: '⚔️',
    players: '2 players', playerCount: '2',
    difficulty: 'Easy', premium: false, comingSoon: true,
    regions: ['Universal', 'North America'],
    languages: [LANG.en, LANG.fr, LANG.de, LANG.es, LANG.pt, LANG.hi, LANG.ar],
    description: 'War is the ultimate beginner card game — no decisions required. Both players flip their top card simultaneously; the higher card wins the pile. Ties trigger a dramatic "war" that raises the stakes. A game of pure chance that\'s endlessly tense.',
    objective: 'Win all 52 cards.',
    setup: [
      'Use a standard 52-card deck. Aces are high.',
      'Split the deck evenly — 26 cards each, held face-down.',
    ],
    gameplay: [
      'Both players simultaneously flip their top card to the centre.',
      'The higher card wins both cards; the winner places them at the bottom of their stack.',
      'TIE (War): each player places 3 cards face-down, then flips 1 face-up. Highest wins ALL cards on the table.',
      'If a war tie occurs again, repeat the war process.',
      'The player who accumulates all 52 cards wins.',
    ],
    scoring: 'Player who captures all cards wins. For timed play, most cards after a set number of rounds wins.',
    tips: [
      'Pure chance — no strategy. Great for teaching card rankings.',
      'Set a round limit (e.g., 30 rounds) to keep the game from going on forever.',
    ],
  },
  {
    slug: 'crazy-eights',
    name: 'Crazy Eights',
    alternateNames: ['Mau-Mau (Germany)', 'Dos (Mexico)'],
    tagline: 'Match the suit or rank — 8s are always wild.',
    icon: '8️⃣',
    players: '2–7 players', playerCount: '2–7',
    difficulty: 'Easy', premium: false, comingSoon: true,
    regions: ['Universal', 'North America'],
    languages: [LANG.en, LANG.de, LANG.es, LANG.fr, LANG.pt, LANG.nl, LANG.hi, LANG['zh-CN']],
    description: 'Crazy Eights is a classic shedding game that inspired Uno. Play a card matching the suit or rank of the top discard; 8s are wild and let you call any suit. First player to empty their hand wins.',
    objective: 'Be the first to discard all your cards.',
    setup: [
      'Use a standard 52-card deck. Deal 8 cards each (5 for 3+ players).',
      'Flip one card face-up to start the discard pile; place the draw pile beside it.',
    ],
    gameplay: [
      'On your turn, play one card from your hand onto the discard pile. It must match the current card\'s suit OR rank.',
      'If you cannot play, draw cards from the draw pile until you can play or the pile is exhausted (then pass).',
      'Playing an 8 is always legal — after playing it, name any suit. The next player must match that suit (or play another 8).',
      'Optional special cards: Q = skip next player; A = reverse direction; 2 = next player draws 2.',
      'First player to empty their hand wins.',
    ],
    scoring: 'The winner scores the deadwood in opponents\' hands: 8s = 50 pts, face cards = 10 pts, Aces = 1 pt, others = face value. Play to 200 (or an agreed total).',
    tips: [
      'Hoard 8s until you need to escape a bad suit.',
      'Call the suit you have the most cards of after playing an 8.',
      'With special card rules, a well-timed Queen or 2 can strand an opponent.',
    ],
  },
  {
    slug: 'old-maid',
    name: 'Old Maid',
    alternateNames: ['Babanuki (Japan)', 'Black Peter (Germany)', 'Donkey'],
    tagline: 'Don\'t be left holding the unpaired Queen.',
    icon: '👵',
    players: '2–6 players', playerCount: '2–6',
    difficulty: 'Easy', premium: false, comingSoon: true,
    regions: ['Universal', 'North America', 'Asia'],
    languages: [LANG.en, LANG.ja, LANG.ko, LANG['zh-CN'], LANG.de, LANG.fr, LANG.es, LANG.hi],
    description: 'Old Maid is a charming matching game for all ages. Remove one Queen so one "Old Maid" is left unpaired; discard all your pairs and pray your opponent doesn\'t foist the unmatchable Queen on you.',
    objective: 'Avoid being the player holding the single unmatched Queen (the Old Maid) when all other cards have been paired.',
    setup: [
      'Remove one Queen from the deck (leaving one unpaired Queen — the "Old Maid").',
      'Deal all cards. Players immediately discard any pairs face-up.',
    ],
    gameplay: [
      'The player left of the dealer fans their hand face-down towards the next player.',
      'That player draws one card; if it pairs with any card in their hand, discard the pair. Then they fan their hand to the next player.',
      'Play continues clockwise.',
      'Players who discard all their cards are safe and out of the game.',
      'The player left holding the single Queen at the end is the Old Maid and loses.',
    ],
    scoring: 'One player is the loser (the Old Maid). All others win. Play multiple rounds; track who has been the Old Maid the most.',
    tips: [
      'Try to conceal the Old Maid by keeping it in the middle of your fan.',
      'Watch for the card opponents hesitate over — it\'s likely the one they don\'t want you to take.',
    ],
  },
  {
    slug: 'sevens',
    name: 'Sevens',
    alternateNames: ['Fan Tan', 'Parliament', 'Card Dominoes', 'Sevens (Indian)'],
    tagline: 'Build from 7 out — first to empty their hand wins.',
    icon: '7️⃣',
    players: '3–7 players', playerCount: '3–7',
    difficulty: 'Easy', premium: false, comingSoon: true,
    regions: ['Universal', 'Asia', 'India'],
    languages: [LANG.en, LANG['zh-CN'], LANG.ja, LANG.ko, LANG.hi, LANG.vi, LANG.fr, LANG.de, LANG.es, LANG.it],
    description: 'Sevens (Fan Tan) is one of the most universally played card games. Build four suit sequences outward from each suit\'s 7; every turn you must extend a sequence or pass. Plan your holds carefully to block opponents.',
    objective: 'Be the first player to play all your cards.',
    setup: [
      'Use a standard 52-card deck. Deal all cards evenly (some may have an extra card).',
      'The player holding 7♦ (or any 7) plays first.',
    ],
    gameplay: [
      'The first player places a 7 face-up, starting that suit\'s sequence in the centre.',
      'On your turn, you must play a card that is adjacent to an existing sequence end (e.g., 8♦ extends a 7♦ upward; 6♦ extends it downward) OR start a new suit\'s sequence with that suit\'s 7.',
      'Sequences extend from 7 up to King (high end) and down to Ace (low end).',
      'If you cannot play any legal card, pass. In some variants, pass tokens are limited.',
      'First player to empty their hand wins.',
    ],
    scoring: 'Losers score penalty points equal to the pip values of remaining cards. First to reach an agreed threshold (e.g., 100 points) loses; lowest score wins.',
    tips: [
      'Hold back the card just below your 7 to create a bottleneck — blocking others\' sequences.',
      'With limited passes, save them for when holding a blocker is strategically vital.',
      'Watch what sequences opponents are building to anticipate what they need.',
    ],
  },
  {
    slug: 'snap',
    name: 'Snap',
    tagline: 'Match the cards — and shout first.',
    icon: '👋',
    players: '2–6 players', playerCount: '2–6',
    difficulty: 'Easy', premium: false, comingSoon: true,
    regions: ['Universal', 'EU'],
    languages: [LANG.en, LANG.fr, LANG.de, LANG.it, LANG.es, LANG.nl, LANG.hi],
    description: 'Snap is a fast-reaction matching game beloved in the UK and across Europe. Players flip cards to a central pile; when two consecutive cards match in rank, the first to shout "Snap!" wins the pile. Speed beats strategy every time.',
    objective: 'Win all the cards by shouting "Snap!" fastest when matching cards appear.',
    setup: [
      'Use a standard 52-card deck. Deal all cards face-down equally.',
    ],
    gameplay: [
      'Players take turns flipping their top card face-up to a personal pile in front of them.',
      'When the face-up card on one player\'s pile matches the face-up card on another\'s pile in rank, any player may shout "Snap!"',
      'The first to shout "Snap!" wins all the cards in BOTH matching piles, adding them to the bottom of their hand.',
      'False "Snap!" calls (when cards don\'t match) result in giving one card to each other player.',
      'A player who runs out of cards is eliminated. Last player with cards wins.',
    ],
    scoring: 'The player who wins all cards wins the game.',
    tips: [
      'Keep your eyes on ALL piles simultaneously — Snap can involve any two players\' piles.',
      'Speed matters more than accuracy — but false snaps cost cards.',
    ],
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   NORTH AMERICA
   ───────────────────────────────────────────────────────────────────────────── */
const northAmericaGames: Game[] = [
  {
    slug: 'hearts',
    name: 'Hearts',
    tagline: 'Avoid the hearts — and beware the Queen of Spades.',
    icon: '♥',
    players: '4 players', playerCount: '4',
    difficulty: 'Medium', premium: false,
    regions: ['North America'],
    languages: [LANG.en, LANG.fr, LANG.de, LANG.es, LANG.hi],
    description: 'Hearts is a classic trick-avoidance game where you want to avoid winning hearts or the dreaded Queen of Spades. But if you collect ALL the penalty cards you "Shoot the Moon" and punish everyone else instead.',
    objective: 'Have the lowest score when any player reaches 100 points.',
    setup: [
      'Use a standard 52-card deck; deal 13 cards to each of 4 players.',
      'Each player passes 3 cards left (first round); direction rotates; fourth round: no pass.',
      'The player holding 2♣ leads the first trick.',
    ],
    gameplay: [
      'The lead player may play any card except a heart on the first trick (unless only hearts remain).',
      'All others must follow suit if possible; if not, discard any card.',
      'Highest card of the led suit wins the trick. No trump.',
      'Hearts may not be led until "heart break" — a heart has been discarded on a prior trick.',
      'The winner of each trick leads the next.',
    ],
    scoring: 'Each ♥ = 1 pt. Q♠ = 13 pts. All others = 0. Lowest score wins. Shoot the Moon: take all 13 hearts AND Q♠ → each other player gets 26 pts.',
    tips: [
      'Pass high spades early to avoid holding the Q♠.',
      'Shooting the Moon is risky but decisive — start collecting if you already have 6+ hearts.',
    ],
  },
  {
    slug: 'spades',
    name: 'Spades',
    tagline: 'Bid smart. Spades are always trump.',
    icon: '♠',
    players: '4 players (2 teams)', playerCount: '4',
    difficulty: 'Medium', premium: true,
    regions: ['North America'],
    languages: [LANG.en, LANG.es, LANG.fr],
    description: 'Spades is North America\'s most iconic trick-taking partnership game. Every hand starts with a bidding phase — your team must win exactly the tricks you bid. Too few costs points; too many "sandbags" accumulate into penalties.',
    objective: 'Be the first team to reach 500 points.',
    setup: [
      'Two teams of two sit opposite each other. Deal 13 cards to each player.',
      'Each player bids 0–13 tricks. Team bid = sum of both partners\' bids.',
    ],
    gameplay: [
      'Spades cannot be led until they have been "broken" (played as a discard in another suit), unless a player has only spades.',
      'Spades beat all other suits. Highest spade wins if any are played; otherwise highest of led suit wins.',
      'Players must follow suit. If void, play any card including a spade.',
    ],
    scoring: 'Made bid: 10 × bid. Each overtrick (bag): +1 but every 10 bags = −100. Failed bid: −10 × bid. Nil bid made: +100. Nil bid failed: −100. Blind nil: ±200.',
    tips: [
      'Count trump — know how many spades remain.',
      'Don\'t overbid; bags accumulate slowly but hit hard.',
      'Support your partner\'s nil by leading low cards they can underplay.',
    ],
  },
  {
    slug: 'gin-rummy',
    name: 'Gin Rummy',
    tagline: 'Knock before they do.',
    icon: '🍸',
    players: '2 players', playerCount: '2',
    difficulty: 'Medium', premium: false,
    regions: ['North America'],
    languages: [LANG.en, LANG.es, LANG.fr, LANG.de, LANG.hi],
    description: 'Gin Rummy is a beloved two-player rummy variant known for its tense knock-or-gin decisions. Draw, discard, build melds — then knock when your unmatched cards total 10 or fewer.',
    objective: 'Reach 100 points first by reducing deadwood to 10 or fewer to knock, or to 0 for Gin.',
    setup: [
      'Use a standard 52-card deck. Aces are low. Deal 10 cards each.',
      'Flip one card face-up (discard pile start); rest is the stock.',
      'Non-dealer may take the face-up card or decline; if both decline, non-dealer draws from stock.',
    ],
    gameplay: [
      'On your turn, draw from stock or top of discard. Then discard one card.',
      'A meld is a set (3–4 same rank) or run (3+ consecutive same suit).',
      'Knock by discarding face-down when your unmatched cards total ≤ 10.',
      'After a knock, reveal hands. Opponent may lay off cards onto your melds.',
      'Gin: knock with 0 deadwood — opponent cannot lay off.',
    ],
    scoring: 'Knocker wins difference in deadwood; undercut: opponent wins difference +25 bonus. Gin: 25 bonus + opponent\'s full deadwood. First to 100 wins; add 25 pts per hand won + 100 game bonus.',
    tips: [
      'Discard high unmatched cards (K, Q, J) early.',
      'Avoid feeding cards your opponent is collecting.',
      'A gin is worth the extra turns if you\'re close.',
    ],
  },
  {
    slug: 'euchre',
    name: 'Euchre',
    tagline: 'Name the trump. Take three tricks. Prove your Right Bower.',
    icon: '🪄',
    players: '4 players (2 teams)', playerCount: '4',
    difficulty: 'Hard', premium: true,
    regions: ['North America'],
    languages: [LANG.en, LANG.de],
    description: 'Euchre is a fast trick-taking partnership game enormously popular in the US Midwest, Canada, and UK. The defining feature: the Jack of trump (Right Bower) is highest, and the Jack of the same-colour suit (Left Bower) is second highest.',
    objective: 'First team to 10 points wins by winning at least 3 of 5 tricks after naming trump.',
    setup: [
      'Uses a 24-card deck: 9, 10, J, Q, K, A of each suit. Deal 5 cards each.',
      'Flip the remaining card — this proposes the trump suit.',
    ],
    gameplay: [
      'ORDERING UP: Each player (left of dealer first) may accept the flipped suit as trump or pass. If accepted, dealer picks up the card and discards one.',
      'If all pass, a second round names any other suit or passes again.',
      'Trump ranking (high→low): Right Bower (J of trump) > Left Bower (J same-colour) > A > K > Q > 10 > 9.',
      'Left Bower is NO LONGER part of its original suit.',
      'Caller\'s team must win ≥ 3 tricks; "going alone" allowed for bigger rewards.',
    ],
    scoring: 'Made (3–4 tricks): 1 pt. March (5 tricks): 2 pts. Euchred (caller fails): opponents get 2 pts. Going alone + march: 4 pts.',
    tips: [
      'Memorise Bower structure — Left Bower counts as trump, not its printed suit.',
      'Three trump cards = strong "order up." Two trump + one Ace = borderline.',
    ],
  },
  {
    slug: 'cribbage',
    name: 'Cribbage',
    tagline: 'Peg your way to 121 — every combination counts.',
    icon: '📌',
    players: '2 players', playerCount: '2',
    difficulty: 'Hard', premium: true,
    regions: ['North America', 'EU'],
    languages: [LANG.en, LANG.fr],
    description: 'Cribbage is a 17th-century English game famous for its pegging board and depth of scoring. It features two distinct phases — pegging (playing cards alternately) and counting (scoring hand combinations).',
    objective: 'Be the first to reach exactly 121 points on the cribbage board.',
    setup: [
      'Use a standard 52-card deck. Aces are always low. Deal 6 cards each.',
      'Each player discards 2 cards to the "crib" (dealer\'s bonus hand).',
      'Cut the deck; flip top card as the "starter." Dealer pegs 2 pts if it\'s a Jack ("His Heels").',
    ],
    gameplay: [
      'PEGGING: Alternate playing one card; announce running total (never exceed 31). Score for 15s, 31s, pairs, triples, quads, and runs during play.',
      '"Go" (cannot play without exceeding 31): opponent pegs 1 pt; reset to 0.',
      'COUNTING: Non-dealer counts hand first (with starter), then dealer counts hand, then dealer counts crib.',
      'Score combinations: 15s = 2 pts, pairs = 2 pts, runs = 1 pt/card, flush = 4–5 pts, Nobs (J matching starter suit) = 1 pt.',
    ],
    scoring: 'All points pegged immediately. First to reach 121 wins — even mid-pegging during play.',
    tips: [
      'Discard wisely to the crib: feed it when you\'re the dealer; starve it when you\'re not.',
      'Keep cards that form multiple 15s (e.g., 5+any-10-value).',
      'Run scoring during pegging beats individual pairs — extend runs.',
    ],
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   LATIN AMERICA
   ───────────────────────────────────────────────────────────────────────────── */
const latinAmericaGames: Game[] = [
  {
    slug: 'canasta',
    name: 'Canasta',
    alternateNames: ['Basket'],
    tagline: 'Build 7-card melds and go out first.',
    icon: '🧺',
    players: '4 players (2 teams)', playerCount: '4',
    difficulty: 'Medium', premium: false, comingSoon: true,
    regions: ['Latin America', 'North America', 'EU'],
    languages: [LANG.es, LANG.pt, LANG.en, LANG.it, LANG.de, LANG.fr],
    description: 'Canasta originated in Montevideo, Uruguay and swept the world in the 1950s. Teams build melds of 7+ cards of the same rank (called "canastas") using wild cards freely. The game combines rummy-style building with partnership strategy.',
    objective: 'First team to 5,000 points by completing canastas and going out.',
    setup: [
      'Uses 2 standard decks + 4 jokers (108 cards total).',
      '4 players in 2 partnerships. Deal 11 cards each.',
      'Flip one card to start the discard pile (the "pack"). If it\'s a wild card or red 3, keep flipping until a natural card appears.',
    ],
    gameplay: [
      'On your turn, draw 2 cards from the stock OR take the entire discard pile (if legal).',
      'Wild cards (Jokers + 2s) may substitute for any natural card in a meld.',
      'A meld is 3+ cards of the same rank. A canasta is a completed meld of 7+ cards.',
      'Natural (clean) canasta: 7 natural cards, no wilds = 500 pts. Mixed canasta: includes wild cards = 300 pts.',
      'Red 3s: place face-up immediately; score 100 pts each (or −100 if not a team canasta). Black 3s: block the discard pile.',
      'A player may go out (discard last card) only if their team has at least one canasta.',
    ],
    scoring: 'Canasta totals: natural = 500, mixed = 300. Red 3s: 100 each (×2 if all four held). Each card has a point value. Going-out bonus = 100. First team to 5,000 pts wins.',
    tips: [
      'Prioritise completing your first canasta — it unlocks going out.',
      'Taking the discard pile when it\'s large is often worth any entry cost.',
      'Protect wild cards; the opposing team may freeze the pack against you.',
    ],
  },
  {
    slug: 'buraco',
    name: 'Buraco',
    tagline: 'Complete your canastas — then grab the pot.',
    icon: '🇧🇷',
    players: '4 players (2 teams)', playerCount: '4',
    difficulty: 'Medium', premium: false, comingSoon: true,
    regions: ['Latin America', 'EU'],
    languages: [LANG.pt, LANG.it, LANG.es, LANG.en],
    description: 'Buraco is Italy\'s gift to South America (via immigrants) and is now a national passion in Brazil and Argentina. Two hidden "pot" piles add a dramatic mid-game refill; natural Buracos (7-card pure sequences) earn top bonuses.',
    objective: 'First team to 3,000 points by building melds, completing Buracos, and going out.',
    setup: [
      'Uses 2 standard decks + 4 jokers (108 cards). 4 players in 2 teams.',
      'Deal 11 cards to each player. Place two face-down "pot" piles of 11 cards each (one per team) in the centre.',
    ],
    gameplay: [
      'Play is like Canasta: draw one card from stock or take the discard pile, then meld or lay off, then discard.',
      'When a player empties their hand by discarding, their team immediately picks up their pot pile and continues playing.',
      'A Buraco is a completed meld of 7+ cards: natural (no wilds) = 200 pts bonus; dirty (includes wilds) = 100 pts bonus.',
      'A team must complete at least one Buraco before going out.',
      'Going out (final discard after emptying hand post-pot): 200 pts bonus.',
    ],
    scoring: 'Natural Buraco = 200, dirty Buraco = 100. Each card has a point value (similar to Canasta). Going-out bonus = 200. Penalty for cards held when opponents go out. First to 3,000 pts wins.',
    tips: [
      'Complete a Buraco as soon as possible to enable going out.',
      'Your pot pile is both a lifeline and a target — try to empty your hand to grab it on your terms.',
    ],
  },
  {
    slug: 'chinchon',
    name: 'Chinchón',
    alternateNames: ['Chinchón', 'Chinchon'],
    tagline: 'Form your runs and sets — Chinchón closes the round instantly.',
    icon: '🇦🇷',
    players: '2–8 players', playerCount: '2–8',
    difficulty: 'Medium', premium: false, comingSoon: true,
    regions: ['Latin America', 'EU'],
    languages: [LANG.es, LANG.pt, LANG.en],
    description: 'Chinchón is a beloved Spanish/Argentinian rummy variant played with a 40-card Spanish deck. Build sets and runs to minimise deadwood — or complete all 7 cards of the same suit (Chinchón) to instantly win the round.',
    objective: 'Score the fewest penalty points. A player reaching 100 points is eliminated; last standing wins.',
    setup: [
      'Uses a 40-card Spanish deck (remove 8s, 9s, 10s from a standard 52-card deck). Aces are low (1 pt).',
      'Deal 7 cards each. Flip one card face-up for the discard pile.',
    ],
    gameplay: [
      'On your turn, draw one card from the stock or the discard pile.',
      'Discard one card face-up.',
      'A set is 3–4 cards of the same rank (different suits). A run is 3+ consecutive cards of the same suit.',
      'Knock (close the round): place your discard face-down when your unmatched cards\' total is low enough (typically ≤ 5 pts).',
      'Chinchón: knock when your entire hand forms one 7-card run of the same suit — all other players score all their deadwood; you score nothing (or receive a bonus).',
      'After a knock all players reveal hands and score their deadwood.',
    ],
    scoring: 'Deadwood = pip value of unmatched cards (A=1, J=10, Q=10, K=10). Chinchón = 0 points (or −10 in some variants). Players eliminated at 100 cumulative points. Last player standing wins.',
    tips: [
      'Always aim for runs — they are longer and easier to extend than sets.',
      'Hold both low cards (cheap deadwood) and high-potential run starters.',
      'If you have 6 cards of the same suit, consider holding on for Chinchón.',
    ],
  },
  {
    slug: 'briscola',
    name: 'Briscola',
    alternateNames: ['Brisca (Spain)', 'Briscola (Italy)', 'Bisca (Brazil)'],
    tagline: 'Take the high-value cards — trump beats everything else.',
    icon: '🍷',
    players: '2–4 players', playerCount: '2–4',
    difficulty: 'Medium', premium: false, comingSoon: true,
    regions: ['EU', 'Latin America'],
    languages: [LANG.it, LANG.es, LANG.pt, LANG.en],
    description: 'Briscola is Italy\'s most popular card game and a staple across Spain and Latin America under the name Brisca. There\'s no obligation to follow suit — trump your opponents, capture point-laden Aces and Threes, and outscore them.',
    objective: 'Score more than 60 of the 120 possible card points.',
    setup: [
      'Uses a 40-card Italian/Spanish deck (remove 8s, 9s, 10s). Deal 3 cards each.',
      'Flip one card face-up — its suit is the Briscola (trump suit). Slide it under the stock.',
      'After each trick, players draw one card from the stock until it\'s exhausted.',
    ],
    gameplay: [
      'The non-dealer leads any card to the first trick.',
      'The other player(s) each play one card. There is NO obligation to follow suit or trump.',
      'If a trump (Briscola suit) is played, the highest trump wins the trick. Otherwise, the highest card of the led suit wins.',
      'Card ranking in each suit (high → low): A(11), 3(10), K(4), Q(3), J(2), 7, 6, 5, 4, 2.',
      'After all tricks are played, count your card-point total.',
    ],
    scoring: 'Total points in deck = 120. First to 61+ wins. In partnership play (4 players, 2 teams), combine partner scores. Optional: track cumulative wins across multiple rounds.',
    tips: [
      'Aces and Threes are the highest-value cards — protect them.',
      'Lead with low point cards to test opponents\' trump holdings.',
      'In team play, signal to your partner which suit to lead back.',
    ],
  },
  {
    slug: 'truco',
    name: 'Truco',
    tagline: 'Bluff, bet, and outwit — Latin America\'s card game.',
    icon: '🌶️',
    players: '2–4 players', playerCount: '2 or 4',
    difficulty: 'Hard', premium: true,
    regions: ['Latin America'],
    languages: [LANG.es, LANG.pt, LANG.en],
    description: 'Truco is a trick-taking and bluffing game wildly popular across Brazil, Argentina, and Latin America. Its unique card rankings, verbal betting calls (Truco! Retruco! Vale Quatro!), and partnership signalling make it unlike any other card game.',
    objective: 'First player or team to 12 points wins (short game) or 30 points (full game).',
    setup: [
      'Uses a 40-card Spanish/Truco deck (remove 8s, 9s, and Jokers from a standard deck).',
      'Deal 3 cards to each player. No trump suit is declared; card power follows the fixed hierarchy.',
    ],
    gameplay: [
      'CARD HIERARCHY (highest to lowest): 1♠ > 1♣ > 7♦ > 7♥ > 3 > 2 > 1 (♥/♦) > 12(K) > 11(Q) > 10(J) > 7♠/7♣ > 6 > 5 > 4.',
      'Each hand has up to 3 tricks (rounds). Best of 3 wins the hand.',
      'ENVIDO (point bet): Call before the second card of the first trick. Points = sum of two highest same-suit cards + 20.',
      'TRUCO (trick bet): Call "Truco!" at your turn. Opponent can accept (2 pts), raise "Retruco!" (3 pts), raise "Vale Quatro!" (4 pts), or fold.',
      'In partnership play, partners may use legal hand signals to communicate hand strength.',
    ],
    scoring: 'Envido win: 2 pts (escalating with raises). Truco win: 1–4 pts. Flor (all 3 same suit): 3 pts auto. First to 12 (or 30) wins.',
    tips: [
      'Bluffing is central — "Truco!" with a weak hand can still win if they fold.',
      'Memorise the top 4 cards: 1♠, 1♣, 7♦, 7♥.',
      'Develop a signalling system with your partner for card strength.',
    ],
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   ASIA
   ───────────────────────────────────────────────────────────────────────────── */
const asiaGames: Game[] = [
  {
    slug: 'tien-len',
    name: 'Tiến Lên',
    alternateNames: ['Thirteen', 'Vietnamese Cards', 'Thirteen Cards'],
    tagline: 'Vietnam\'s Big Two — shed your cards before anyone else.',
    icon: '🇻🇳',
    players: '4 players', playerCount: '4',
    difficulty: 'Medium', premium: false, comingSoon: true,
    regions: ['Asia'],
    languages: [LANG.vi, LANG.en, LANG['zh-CN'], LANG.id, LANG.tl],
    description: 'Tiến Lên ("moving up" in Vietnamese) is Vietnam\'s most popular card game and one of the most-played games across Southeast Asia. Like Big Two, players race to shed cards; the unique twist is that 2s are the highest single card and powerful "bombs" can beat any combination.',
    objective: 'Be the first player to shed all cards from your hand.',
    setup: [
      'Use a standard 52-card deck. Deal all 13 cards to each of 4 players.',
      'Card rank (low → high): 3 4 5 6 7 8 9 10 J Q K A 2.',
      'Suit rank (low → high): ♠ ♣ ♦ ♥.',
      'The player with 3♠ leads first (and must include it in their opening play).',
    ],
    gameplay: [
      'Lead with any legal combination: single, pair, triple, or 5-card hand (sequence, flush, full house, four-of-a-kind, straight flush).',
      'Each subsequent player must beat the current play with a HIGHER combination of the SAME type.',
      'Passing is allowed; if all others pass the last player who played starts a new free lead.',
      'BOMBS: A four-of-a-kind or a double pair run (3 consecutive pairs) beats ANY combination — even a 2.',
      'A single 2 can only be beaten by a four-of-a-kind or double pair run bomb.',
    ],
    scoring: 'First player to go out wins. Penalty points: cards remaining = point penalty. Sweep penalty (holding all 13 cards when another player goes out) = doubled penalty.',
    tips: [
      'Conserve 2s — they are powerful singles that break through sequences.',
      'A four-of-a-kind is a near-unbeatable bomb; save it for a winning play.',
      'Lead sequences early to reduce the chance of others having perfect counters.',
    ],
  },
  {
    slug: 'koi-koi',
    name: 'Koi-Koi',
    alternateNames: ['こいこい', 'Hanafuda', 'Flower Cards'],
    tagline: 'Match the flowers — say "Koi-Koi" to risk it all.',
    icon: '🌸',
    players: '2 players', playerCount: '2',
    difficulty: 'Hard', premium: false, comingSoon: true,
    regions: ['Asia'],
    languages: [LANG.ja, LANG.ko, LANG['zh-TW'], LANG.en],
    description: 'Koi-Koi is played with the beautiful 48-card Hanafuda (flower cards) deck, where each of the 12 suits represents a month and a plant. Match cards from the table to build "yaku" (scoring combinations). Calling "Koi-Koi" lets you keep playing for more points — but risks your opponent going out first.',
    objective: 'Score the most points across multiple rounds by completing "yaku" (flower combinations).',
    setup: [
      'Uses a 48-card Hanafuda deck (12 suits/months × 4 cards each: 2 plain, 1 ribbon, 1 special).',
      'Deal 8 cards to each player face-down; deal 8 cards face-up to the table.',
      'Remaining 24 cards form the draw pile.',
    ],
    gameplay: [
      'On your turn, match one card from your hand to a card on the table of the SAME suit (month). Both go to your capture pile.',
      'Then flip the top draw card. If it matches a suit on the table, capture both; otherwise it stays on the table.',
      'After each capture, check if you have completed a yaku (scoring combination). If yes, you may either CALL OUT (take your points and end the round) or say "KOI-KOI" (continue playing to score more).',
      'If you say Koi-Koi and your opponent completes a yaku first, they score DOUBLE for winning after your Koi-Koi.',
      'Round ends when a player calls out, or all cards are played (dealer scores 6 pts for a drawn round).',
    ],
    scoring: 'Key yaku: Five Lights (highest 5 special cards) = 10 pts; Four Lights = 8 pts; Flower Viewing (Sake cup + Cherry blossoms) = 5 pts; Boar-Deer-Butterfly = 5 pts. Koi-Koi doubles the winning score if the Koi-Koi caller loses. First to 50 pts (or agreed total) wins.',
    tips: [
      'The Five Lights yaku is extremely powerful — if you collect 3 Lights, consider going for it.',
      'Calling Koi-Koi with a weak hand is very risky against an experienced opponent.',
      'Watch which month cards your opponent captures to anticipate their yaku.',
    ],
  },
  {
    slug: 'big-two',
    name: 'Big Two',
    alternateNames: ['大老二', 'Deuces', 'Cho Dai Di', 'Pusoy Dos (Philippines)'],
    tagline: 'The 2 rules — race to empty your hand.',
    icon: '2️⃣',
    players: '2–4 players', playerCount: '2–4',
    difficulty: 'Medium', premium: true,
    regions: ['Asia'],
    languages: [LANG['zh-TW'], LANG['zh-CN'], LANG.en, LANG.tl, LANG.vi, LANG.id, LANG.ko, LANG.ja],
    description: 'Big Two (大老二, Deuces) is hugely popular throughout East and Southeast Asia. Deuces are the highest cards, suits break ties, and you can play singles, pairs, triples, or powerful five-card combinations to stay ahead.',
    objective: 'Be the first player to get rid of all your cards.',
    setup: [
      'Use a standard 52-card deck. Deal all cards: 13 each for 4 players.',
      'Card ranks (low→high): 3 4 5 6 7 8 9 10 J Q K A 2.',
      'Suit ranks (low→high): ♦ ♣ ♥ ♠.',
      'The player holding 3♦ goes first (must include 3♦ in opening play).',
    ],
    gameplay: [
      'Legal plays: single, pair, triple, or 5-card hand.',
      'Five-card ranks (low→high): Straight < Flush < Full House < Four-of-a-Kind < Straight Flush.',
      'A Four-of-a-Kind or Straight Flush always beats Straight, Flush, or Full House.',
      'Each subsequent player must play the same combination type but HIGHER, or pass.',
      'When all others pass, the last player starts a fresh round with any legal combination.',
    ],
    scoring: 'Cards remaining = penalty. 13 cards = ×3 penalty; 10–12 cards = ×2.',
    tips: [
      'Save 2s — but don\'t hoard or you\'ll be stuck at game end.',
      'Five-card hands can clear a round regardless of prior plays.',
      'Track suit counts; opponents without a high suit will struggle to beat your lead.',
    ],
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   INDIA
   ───────────────────────────────────────────────────────────────────────────── */
const indiaGames: Game[] = [
  {
    slug: 'court-piece',
    name: 'Court Piece',
    alternateNames: ['Rung', 'Rang', 'Coat Piece', 'Hokm (Iran)'],
    tagline: 'Win 7 tricks first — then defend in the second half.',
    icon: '🏛️',
    players: '4 players (2 teams)', playerCount: '4',
    difficulty: 'Medium', premium: false, comingSoon: true,
    regions: ['India'],
    languages: [LANG.hi, LANG.ur, LANG.pa, LANG.en, LANG.mr, LANG.gu],
    description: 'Court Piece (Rang/Rung) is one of the most popular trick-taking games in India, Pakistan, and Iran. The team that wins the first 7 tricks "cuts" the court; now they must prevent their opponents from winning 7 consecutive tricks in the second phase.',
    objective: 'Win the match by securing the "court" (7 tricks in the first half) and defending it in the second half, or by winning all 13 tricks.',
    setup: [
      'Use a standard 52-card deck. Deal 5 cards to each player (3+2 or 2+3 in packets).',
      'The player left of the dealer (called the "trump caller") looks at their 5 cards and names the trump suit.',
      'Remaining cards are dealt (4 each), completing 13-card hands.',
    ],
    gameplay: [
      'Trump caller leads the first trick. Players must follow suit if possible; otherwise play any card.',
      'Highest trump wins if any trumps played; otherwise highest of led suit wins.',
      'FIRST HALF: Play continues until one team wins their 7th trick — they have "cut the court."',
      'SECOND HALF: Now the opposing team tries to win 7 CONSECUTIVE tricks. The court-cutting team tries to prevent this.',
      'If the court-cutting team wins all 13 tricks (a "bavney"), they score double.',
    ],
    scoring: 'Court Piece: winning team scores 1 point per round. 7 consecutive tricks by opponents = "Court" lost, opponents score. Bavney (all 13 tricks): scoring team gets 2 points. First to 5 points wins the game (can vary by agreement).',
    tips: [
      'Name trump based on your strongest suit — but beware: long trump holdings are vital.',
      'In the second half, defenders should break opponent runs by sacrificing tricks strategically.',
      'A Bavney win is rare but devastating — pursue it only with a dominant hand.',
    ],
  },
  {
    slug: 'mendikot',
    name: 'Mendikot',
    alternateNames: ['Mindicot', 'Dehla Pakad (Delhi variant)'],
    tagline: 'Capture all four 10s — or stop your opponents from doing it.',
    icon: '🔟',
    players: '4 players (2 teams)', playerCount: '4',
    difficulty: 'Medium', premium: false, comingSoon: true,
    regions: ['India'],
    languages: [LANG.gu, LANG.mr, LANG.hi, LANG.en],
    description: 'Mendikot is the premier card game of Maharashtra and Gujarat, India. The goal is deceptively simple: capture all four 10s. Capturing the four 10s results in a Mendikot — a shutout victory worth double. Strategy revolves entirely around protecting and hunting the Tens.',
    objective: 'Capture all four 10s to win a Mendikot, or capture the majority of the 10s to win the round.',
    setup: [
      'Use a standard 52-card deck. Four players in two partnerships, partners sitting opposite.',
      'Deal all 13 cards to each player.',
      'The player who wins the first trick determines the trump suit from the card they lead.',
    ],
    gameplay: [
      'The player left of the dealer leads the first trick with any non-trump card.',
      'Trump is fixed after the first trick: the leader\'s card\'s suit after the first trick establishes trump (OR the dealer\'s last card — varies by local rules).',
      'Players must follow suit; if void, play any card including trump.',
      'Highest trump wins if any trump played; otherwise highest of led suit wins.',
      'Play all 13 tricks.',
    ],
    scoring: 'After all tricks: count how many 10s each team captured. Team with 3–4 tens wins the round. Mendikot (all four 10s): winning team gets double points, or wins the round outright. First team to win an agreed number of rounds wins.',
    tips: [
      'Protect your 10s early — lead suits your opponents must follow to flush out their high cards.',
      'Sacrificing a trick to draw out trump is often worth it to secure a key 10.',
      'In the endgame, if you hold two 10s and your opponents hold two, the team that controls trump usually prevails.',
    ],
  },
  {
    slug: '29-game',
    name: '29 Game',
    alternateNames: ['Twenty-Nine', 'Atu-Katta (Kerala)'],
    tagline: 'Bid up to 29 — win the most points to fulfill your contract.',
    icon: '🌴',
    players: '4 players (2 teams)', playerCount: '4',
    difficulty: 'Hard', premium: false, comingSoon: true,
    regions: ['India'],
    languages: [LANG.ml, LANG.ta, LANG.hi, LANG.bn, LANG.en, LANG.te],
    description: 'The 29 Game is a celebrated trick-taking game from Kerala, South India, played widely across Bangladesh and Nepal. The name refers to the maximum 28 card points in the 32-card deck (plus 1 for last trick). Players bid to win that many points using only 8 cards each and a hidden trump.',
    objective: 'The bidding team must score at least as many card points as their bid; otherwise the defending team wins.',
    setup: [
      'Uses a 32-card deck: 7–Ace in each suit (remove 2s–6s). Deal 4 cards to each player, then 4 more.',
      'Card point values: J=3, 9=2, A=1, 10=1 (total = 28; last trick = 1 extra = 29 possible).',
      'Card rank for trick winning (high→low): J 9 A 10 K Q 8 7.',
    ],
    gameplay: [
      'BIDDING: Starting from the player left of dealer, each player bids a number (min 15, max 28) or passes. The highest bidder wins the contract.',
      'The winner privately shows one card from their hand to their partner only — this card\'s suit is the TRUMP. It is revealed to all only when first played.',
      'The player left of the dealer leads the first trick.',
      'Players must follow suit if possible; if void, they may play any card.',
      'Jacks and 9s are the two highest cards in every suit (including trump), followed by A, 10, K, Q, 8, 7.',
      'When trump is played for the first time, the trump card (held by the bidder) must be revealed.',
    ],
    scoring: 'Bidding team achieves bid: they score the round. Bidding team fails: defending team scores. Optional progressive scoring: failure = bid × penalty. Match played to an agreed number of rounds.',
    tips: [
      'A hand with J and 9 of the same suit is extremely strong — consider bidding high.',
      'Reveal your trump strategically — too early gives opponents time to prepare; too late and you\'re vulnerable.',
      'As the defending team, work together to exhaust the bidding team\'s high-value cards.',
    ],
  },
  {
    slug: 'seep',
    name: 'Seep',
    alternateNames: ['Sweep', 'Sip', 'Seepi'],
    tagline: 'Capture matching cards from the table — sweeps score big.',
    icon: '🌾',
    players: '2–4 players', playerCount: '2–4',
    difficulty: 'Medium', premium: false, comingSoon: true,
    regions: ['India'],
    languages: [LANG.hi, LANG.pa, LANG.en, LANG.ur],
    description: 'Seep is a capture card game popular across North India, particularly in Uttar Pradesh, Haryana, and Punjab. Play a card to the table and capture cards of equal value or combinations that sum to your card. A "Seep" (total sweep of the table) earns a precious bonus point.',
    objective: 'Score the most points by capturing high-value cards, achieving sweeps, and holding the most captured cards.',
    setup: [
      'Use a standard 52-card deck. Card point values: A=1, 2–10 = face value, J=11, Q=12, K=13.',
      'Deal 4 cards to the first player; player bids whether they can make a capture on turn 1. If yes, begin play; if no, deal continues (house rule for opening).',
      'Deal 4 cards each (13 total rounds).',
    ],
    gameplay: [
      'On your turn, play one card from your hand face-up.',
      'CAPTURE: if your card\'s value matches a face-up table card, capture both. You may also capture a group of table cards whose values SUM to your card\'s value.',
      'SEEP (Sweep): if your capture removes ALL cards from the table, it is a Seep — worth 1 bonus point. Mark the capturing card face-up.',
      'If you cannot capture, your card joins the table as a target for others.',
      'After all hands are played, the last player to make a capture takes all remaining table cards (no Seep).',
    ],
    scoring: 'Most cards captured: 1 pt. Most spades: 1 pt. 10♦: 2 pts. A♠: 1 pt. 2♠: 1 pt. J♥: 1 pt. Each Seep: 1 pt. Sum of all points to 52; first player or team to an agreed total wins.',
    tips: [
      'Guard the 10♦ — it\'s the most valuable single card.',
      'A♠ and 2♠ are worth capturing but often leave the table open for a sweep.',
      'When near a Seep, play the exact-value capture card if you have it.',
    ],
  },
  {
    slug: 'indian-rummy',
    name: 'Indian Rummy',
    alternateNames: ['Paplu', '13-Card Rummy', 'Rummy (India)'],
    tagline: 'Form sequences and sets — a pure sequence is non-negotiable.',
    icon: '🃏',
    players: '2–6 players', playerCount: '2–6',
    difficulty: 'Medium', premium: true,
    regions: ['India'],
    languages: [LANG.hi, LANG.bn, LANG.ta, LANG.te, LANG.kn, LANG.mr, LANG.gu, LANG.pa, LANG.ml, LANG.en],
    description: 'Indian Rummy (Paplu / 13-Card Rummy) is India\'s most popular card game. Each player receives 13 cards and must arrange them into valid sequences and sets. The golden rule: you must have at least one pure sequence before you can declare.',
    objective: 'Arrange all 13 cards into valid sequences and sets, with at least one pure sequence, and declare before opponents.',
    setup: [
      'Uses 2 standard 52-card decks + 2 printed Jokers (108 cards total). Deal 13 cards each.',
      'Flip one card to start the discard pile. Draw a random card from the remaining deck — its rank is the Wild Joker for this hand.',
    ],
    gameplay: [
      'Draw one card from the draw pile or top of discard pile.',
      'Then discard one card.',
      'Pure Sequence: 3+ consecutive same-suit cards, NO Joker (e.g., 5♥ 6♥ 7♥).',
      'Impure Sequence: 3+ consecutive same suit with a Wild or Printed Joker substituting.',
      'Set: 3–4 same-rank cards from different suits (Jokers may be used).',
      'To declare, place final discard face-down and show your arranged hand.',
    ],
    scoring: 'Declarer scores 0 if valid. Deadwood penalty: number cards = face value, J/Q/K/A = 10 pts, Joker = 0. Maximum penalty = 80 pts. Wrong declaration = 80 pt penalty.',
    tips: [
      'Form your pure sequence first — without it, even a complete hand is invalid.',
      'High cards (A, K, Q, J) are high-risk deadwood — discard early if unused.',
      'Jokers are most valuable in the middle of long sequences.',
    ],
  },
  {
    slug: 'indian-jackass',
    name: 'Indian Jackass',
    alternateNames: ['Jackass', 'Indian War'],
    tagline: 'War with a twist — don\'t get stuck with the Jacks.',
    icon: '🎴',
    players: '2–4 players', playerCount: '2–4',
    difficulty: 'Easy', premium: true,
    regions: ['India'],
    languages: [LANG.hi, LANG.en, LANG.mr, LANG.gu],
    description: 'Indian Jackass is a lively battle-style card game. Collect the most cards — but the four Jacks are cursed. Whoever holds the most Jacks at the end loses all their points for those Jacks, creating wild swings of fortune.',
    objective: 'Win the most non-Jack cards. The player holding the most Jacks loses points for each.',
    setup: [
      'Use a standard 52-card deck. Deal all cards face-down equally.',
    ],
    gameplay: [
      'All players simultaneously flip their top card to the centre.',
      'The player with the highest card (A high; suits ♠>♥>♦>♣ for tie-breaking) wins all flipped cards.',
      'TIE (War): each tied player places 3 cards face-down then 1 face-up. Highest face-up wins all.',
      'A player who runs out of cards is out.',
      'Game ends when one player has all cards or after an agreed number of rounds.',
    ],
    scoring: 'Count total cards held. Subtract 13 points for EACH Jack held. Highest net score wins.',
    tips: [
      'Track which Jacks are in play — try to pass them via war piles.',
      'Wars are high-risk; you may gain lots of cards including extra Jacks.',
      'In the endgame, lose wars strategically if you\'re already holding Jacks.',
    ],
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   EU (EUROPE)
   ───────────────────────────────────────────────────────────────────────────── */
const euGames: Game[] = [
  {
    slug: 'whist',
    name: 'Whist',
    alternateNames: ['English Whist', 'Bid Whist'],
    tagline: 'The ancestor of Bridge — follow suit and win tricks.',
    icon: '🎩',
    players: '4 players (2 teams)', playerCount: '4',
    difficulty: 'Medium', premium: false, comingSoon: true,
    regions: ['EU', 'North America'],
    languages: [LANG.en, LANG.fr, LANG.de, LANG.nl, LANG.pl],
    description: 'Whist is the grand ancestor of Bridge and Spades, played in the drawing rooms of 18th-century England. No bidding, no trump announcement — just follow suit, use trump wisely, and try to win more tricks than your partnership bid.',
    objective: 'Win the most tricks with your partner. Score 1 point per trick won over 6 (the "book").',
    setup: [
      'Use a standard 52-card deck. Deal all 13 cards to each of 4 players.',
      'The last card dealt (dealer\'s card) is turned face-up to determine the trump suit, then added to the dealer\'s hand.',
    ],
    gameplay: [
      'The player left of the dealer leads any card to the first trick.',
      'Each player must follow suit if possible; if void, play any card including trump.',
      'Highest trump wins if any trump is played; otherwise highest card of led suit wins.',
      'The winner of each trick leads to the next.',
      'Play all 13 tricks.',
    ],
    scoring: 'Each trick won over 6 (the "book") = 1 point. Game is first to 5 points (English Whist), or across multiple hands. Honours (holding A, K, Q, J of trump) award bonus points in some variants.',
    tips: [
      'Lead from your longest suit to establish winners.',
      'Signal to your partner: leading your highest card suggests strength; leading low suggests weakness.',
      'Count trump — avoid leading into your partner\'s trump holding.',
    ],
  },
  {
    slug: 'durak',
    name: 'Durak',
    alternateNames: ['Дурак', 'Fool'],
    tagline: 'Attack, defend, or be the Fool.',
    icon: '🃏',
    players: '2–6 players', playerCount: '2–6',
    difficulty: 'Medium', premium: false,
    regions: ['EU'],
    languages: [LANG.ru, LANG.uk, LANG.pl, LANG.bg, LANG.tr, LANG.en, LANG.de, LANG.fr],
    description: 'Durak (Дурак, "Fool") is Russia\'s most beloved card game and a staple across Eastern Europe. The last player stuck with cards is the Durak — the fool of the round.',
    objective: 'Get rid of all your cards. The last player holding cards is the Durak (Fool).',
    setup: [
      'Uses a 36-card deck (6 through Ace). Deal 6 cards each.',
      'Flip the bottom card of the remaining deck — its suit is Trump for this hand.',
      'Player with lowest trump attacks first.',
    ],
    gameplay: [
      'The attacker plays one or more same-rank cards face-up to the defender.',
      'Defender beats each with a higher card of the same suit OR any trump.',
      'Others may pile on cards of already-played ranks (up to 6 total or defender\'s hand count).',
      'Defender beats all: discard pile, play advances clockwise. Defender fails: takes all cards.',
      'After each bout, all players draw back up to 6 from the draw pile (attacker first, defender last).',
    ],
    scoring: 'Social/penalty game. The Durak shuffles and deals the next round.',
    tips: [
      'Conserve trumps for when you truly need them.',
      'Attack with ranks the defender has already played — they can\'t reuse them.',
      'Taking cards strategically can be worthwhile if you\'re nearly empty-handed.',
    ],
  },
  {
    slug: 'scopa',
    name: 'Scopa',
    alternateNames: ['Sweep', 'Escoba (Spain/Latin America)'],
    tagline: 'Sweep the table — Italy\'s card game of cunning captures.',
    icon: '🍕',
    players: '2–4 players', playerCount: '2–4',
    difficulty: 'Medium', premium: false,
    regions: ['EU', 'Latin America'],
    languages: [LANG.it, LANG.es, LANG.pt, LANG.en],
    description: 'Scopa ("broom") is Italy\'s national card game. On each turn you play a card to the table, capturing cards of the same rank or combinations that sum to your card\'s value. Sweeping the entire table — a Scopa — earns a bonus point.',
    objective: 'Score the most points through captured cards. First to 11 (or agreed total) wins.',
    setup: [
      'Uses a 40-card Italian deck (remove 8s, 9s, 10s from a standard deck).',
      'Deal 3 cards to each player; place 4 face-up on the table. Redeal if 3+ face-up cards share a rank.',
    ],
    gameplay: [
      'Play one card from your hand. If it matches a table card in rank, capture both.',
      'Or capture a group of table cards whose values SUM to your card\'s value.',
      'If your capture clears ALL table cards: Scopa! Place capturing card face-up in your pile.',
      'If no capture possible, add card to table.',
      'Deal new hands when all hands are empty. Last player to make a capture takes remaining table cards.',
    ],
    scoring: 'Cards (most) = 1 pt; Diamonds/Coins (most) = 1 pt; Sette Bello (7♦) = 1 pt; Primiera (best 7-6-A-5 sum) = 1 pt; Scopas = 1 pt each.',
    tips: [
      'Save 7s and Aces — they score in both Primiera and regular captures.',
      'Leave awkward sums on the table to block your opponent.',
      'Deny the Sette Bello (7♦) at almost any cost.',
    ],
  },
  {
    slug: 'belote',
    name: 'Belote',
    alternateNames: ['Belot', 'Bleot', 'Baloot (Arabic)'],
    tagline: 'France\'s national card game — bid, trump, and Coinché.',
    icon: '🥖',
    players: '4 players (2 teams)', playerCount: '4',
    difficulty: 'Hard', premium: true,
    regions: ['EU'],
    languages: [LANG.fr, LANG.el, LANG.bg, LANG.ar, LANG.tr, LANG.en, LANG.de, LANG.nl],
    description: 'Belote is France\'s most beloved card game and a staple across much of Europe and the Middle East. Its defining features — the Jack and Nine becoming the two highest trumps, the Belote-Rebelote bonus, and the contract bidding system — give it a unique feel unlike any other trick-taker.',
    objective: 'Fulfill your team\'s contract bid by scoring at least that many card points combined with any declarations. First team to 501 points wins.',
    setup: [
      'Uses a 32-card deck (7 through Ace — remove 2s–6s). Four players in 2 partnerships.',
      'Deal 8 cards each (3–2–3 pattern).',
    ],
    gameplay: [
      'BIDDING: Starting left of dealer, each player bids a point value (min 80, steps of 10) naming a trump suit, calls Coinché (double), or passes. Highest bid names the contract.',
      'TRUMP CARD RANKING (high→low): J(20) → 9(14) → A(11) → 10(10) → K(4) → Q(3) → 8, 7 (0).',
      'NON-TRUMP RANKING: A(11) → 10(10) → K(4) → Q(3) → J(2) → 9, 8, 7 (0).',
      'BELOTE-REBELOTE: hold K AND Q of trump → announce "Belote" when playing first, "Rebelote" second, = 20 bonus pts.',
      'If the bidding team fails their contract: they score 0, opponents score all 162 card points.',
    ],
    scoring: 'Card points total 162 (including 10 for last trick). Declarations add on top. Coinché doubles, Surcoinché quadruples. First team to 501 wins.',
    tips: [
      'Lead trump Jack early to draw out opponents\' trumps.',
      'The Nine of trump is the second strongest card — don\'t undervalue it.',
      'Bid 80 with a weak hand rather than let opponents play comfortably at 80.',
    ],
  },
  {
    slug: 'skat',
    name: 'Skat',
    alternateNames: ['German Skat'],
    tagline: 'Germany\'s greatest card game — bid, pick up the Skat, and declare.',
    icon: '🇩🇪',
    players: '3 players', playerCount: '3',
    difficulty: 'Hard', premium: true,
    regions: ['EU'],
    languages: [LANG.de, LANG.nl, LANG.pl, LANG.en],
    description: 'Skat is Germany\'s national card game and one of the most intellectually demanding trick-takers in the world. One Declarer bids to play alone against two Defenders; picking up the Skat (two hidden cards) and declaring the game type is a chess-like challenge.',
    objective: 'As Declarer, fulfill your contract (usually win 61+ card points). As Defender, prevent this.',
    setup: [
      'Uses a 32-card deck (7–Ace). Deal 3 cards each, then 2 face-down (the "Skat"), then 4 each, then 3 each (10 cards each hand + 2 Skat).',
      'Card values: A=11, 10=10, K=4, Q=3, J=2. Total in deck = 120.',
    ],
    gameplay: [
      'BIDDING: Players bid numeric values; highest bidder becomes Declarer.',
      'Declarer picks up both Skat cards, discards 2 face-down.',
      'DECLARE: Suit game (one suit as trump), Grand (Jacks only as trump), or Null (win zero tricks).',
      'Trump ranking in Suit games: ♣J > ♠J > ♥J > ♦J, then A, 10, K, Q, 9, 8, 7 of trump.',
      'Declarer needs 61+ card points to win a Suit/Grand game.',
    ],
    scoring: 'Game value = base value × multiplier (Matadors, Schneider, Schwarz). Win: +game value. Lose: −double game value.',
    tips: [
      'Count your Matadors before bidding — they directly set your game value.',
      'As Defender, communicate through lead choices.',
      'Null is all-or-nothing — one trick taken and you lose.',
    ],
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   Combined export
   ───────────────────────────────────────────────────────────────────────────── */
export const games: Game[] = [
  ...universalGames,
  ...northAmericaGames,
  ...latinAmericaGames,
  ...asiaGames,
  ...indiaGames,
  ...euGames,
];

/** Games that are fully released and playable now */
export const availableGames  = games.filter(g => !g.comingSoon);
/** Released games that require a subscription */
export const premiumGames    = availableGames.filter(g =>  g.premium);
/** Released games free to pick after trial */
export const standardGames   = availableGames.filter(g => !g.premium);
/** Games in development — shown in catalog but not yet playable */
export const comingSoonGames  = games.filter(g =>  g.comingSoon);

export function getGame(slug: string): Game | undefined {
  return games.find(g => g.slug === slug);
}

export function getGamesByRegion(region: Region): Game[] {
  return games.filter(g => g.regions.includes(region));
}
