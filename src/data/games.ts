import { LANG } from './regions';
import type { Region, Language } from './regions';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type { Region, Language };

/** One subsection of the detailed how-to-play guide */
export interface PlayGuideSection {
  heading: string;
  points:  string[];
}

/** An in-app screenshot; `file` is a path under src/assets/screenshots/ */
export interface Screenshot {
  file:    string;
  title:   string;
  caption: string;
}

/** A how-to-play YouTube video embedded on the game page */
export interface GameVideo {
  youtubeId: string;
  /** Optional start offset in seconds */
  start?:    number;
}

/** A game-specific FAQ entry appended to the generated FAQ list */
export interface GameFaq {
  q: string;
  a: string;
}

export interface Game {
  slug:           string;
  name:           string;
  alternateNames?: string[];
  tagline:        string;
  icon:           string;
  players:        string;
  playerCount:    string;
  difficulty:     Difficulty;
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
  /** Detailed step-by-step guide shown on the game page (available games) */
  playGuide?:     PlayGuideSection[];
  /** In-app screenshots shown on the game page */
  screenshots?:   Screenshot[];
  /** How-to-play YouTube video embedded on the game page */
  video?:         GameVideo;
  /** Per-game SEO overrides, applied on the English page only */
  seo?:           { title?: string; h1?: string };
  /** Slugs of closely related games, shown in the Related Games section */
  relatedGames?:  string[];
  /** Game-specific FAQs appended to the generated FAQ list (English pages) */
  extraFaqs?:     GameFaq[];
}

/* ─────────────────────────────────────────────────────────────────────────────
   UNIVERSAL — standard across all regions
   ───────────────────────────────────────────────────────────────────────────── */
const universalGames: Game[] = [
  {
    slug: 'high-card',
    name: 'High Card',
    seo: { title: 'How to Play High Card Online – Rules & Strategy | Vanikar', h1: 'How to Play High Card' },
    relatedGames: ['war', 'snap', 'bluff', 'old-maid'],
    tagline: 'The simplest card game — highest card wins.',
    icon: '🂡',
    players: '2–6 players', playerCount: '2–6',
    difficulty: 'Easy',
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
    playGuide: [
      {
        heading: 'Setting up your table',
        points: [
          'From the game menu choose High Card, then pick 2–6 seats. Fill empty seats with AI players using "+ Add AI Player" and set each one\'s difficulty.',
          'Set "Max Points" — the match target. The first player to reach it wins the whole match, so a higher target means a longer game.',
          'Tap "Start Game" to shuffle and deal. The deck is split face-down as evenly as possible; nobody looks at their cards.',
        ],
      },
      {
        heading: 'Playing a round',
        points: [
          'Every player flips the top card of their stack to the centre at the same time — in the app, just tap your stack when prompted.',
          'Cards rank Ace high down to 2 low. The highest rank wins every card flipped this round; suits don\'t matter unless your table enables suit tie-breaks.',
          'Won cards go under the winner\'s stack, and the score for the round is added automatically.',
        ],
      },
      {
        heading: 'Ties and wars',
        points: [
          'If two or more players tie for highest, only the tied players flip again — a "war." The winner of the war takes everything on the table, including the tied cards.',
          'Wars can chain: another tie means another flip. Big wars are where matches swing.',
        ],
      },
      {
        heading: 'Winning the match',
        points: [
          'When the deck runs out the round ends and the app shows the Round Complete summary with everyone\'s totals.',
          'Rounds repeat until someone reaches the Max Points target set at the table — they win the match.',
        ],
      },
    ],
    screenshots: [
      { file: 'high-card/01-game-setup.png',     title: 'Set up the table',  caption: 'Pick 2–6 players, add AI opponents at your preferred difficulty, and set the Max Points target before dealing.' },
      { file: 'high-card/02-deal.png',           title: 'The deal',          caption: 'The deck is split evenly into face-down stacks — no peeking, no decisions, pure suspense.' },
      { file: 'high-card/03-reveal.png',         title: 'The reveal',        caption: 'Everyone flips their top card at once; the highest rank sweeps every card played this round.' },
      { file: 'high-card/04-round-complete.png', title: 'Round complete',    caption: 'The app tallies each round automatically and tracks progress toward the Max Points target.' },
    ],
  },
  {
    slug: 'go-fish',
    name: 'Go Fish',
    video: { youtubeId: 'hRpXLSMdve0' },
    tagline: 'Ask, fish, and collect the most books.',
    icon: '🐟',
    players: '2–4 players', playerCount: '2–4',
    difficulty: 'Easy', comingSoon: true,
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
    playGuide: [
      {
        heading: 'Setup and the deal',
        points: [
          'Go Fish uses a standard 52-card deck and seats 2 to 4 players. A two-player game deals 7 cards each; with three or four players everyone gets 5.',
          'Spread the remaining cards face-down in the middle as the pond, sometimes called the ocean.',
          'Only rank matters in Go Fish — suits are ignored entirely.',
          'Sort your hand by rank before you start so you can see at a glance which ranks you are closest to completing.',
        ],
      },
      {
        heading: 'Asking for cards',
        points: [
          'On your turn, ask one specific player for one specific rank — for example, do you have any Kings?',
          'You may only ask for a rank you already hold at least one of. This is the rule that keeps the game honest and makes listening worthwhile.',
          'If they have any, they must hand over every card of that rank, and you take another turn straight away.',
          'A good turn can chain several times, so start with the rank you are most confident someone holds.',
        ],
      },
      {
        heading: 'Going fishing',
        points: [
          'If the player you asked has nothing, they tell you to go fish and you draw one card from the pond.',
          'Draw exactly the card you asked for and you show it and take another turn. Otherwise your turn ends and play moves on.',
          'Pay attention to what everybody asks for — every question reveals a rank that player is holding.',
          'That information cuts both ways: asking for a rank tells the table you hold it too, so expect it to be asked back.',
        ],
      },
      {
        heading: 'Books and winning',
        points: [
          'Collecting all four cards of a rank makes a book. Lay it face-up in front of you straight away.',
          'If a book completes your hand and cards remain in the pond, draw a new hand and stay in the game.',
          'Play continues until all thirteen books have been made and no cards remain.',
          'The winner is whoever collected the most books — not whoever emptied their hand first.',
        ],
      },
    ],
  },
  {
    slug: 'bluff',
    name: 'Bluff',
    video: { youtubeId: 'DS2vSffV1co' },
    seo: { title: 'How to Play Bluff Online – Rules & Strategy | Vanikar', h1: 'How to Play Bluff' },
    relatedGames: ['president', 'big-two', 'indian-jackass', 'snap'],
    alternateNames: ['Cheat', 'BS', 'I Doubt It', 'Liar'],
    tagline: 'Lie, challenge, and get rid of your cards.',
    icon: '🎭',
    players: '3–6 players', playerCount: '3–6',
    difficulty: 'Easy',
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
    playGuide: [
      {
        heading: 'Setting up your table',
        points: [
          'Bluff shines with a crowd — set up 3–6 seats and fill them with AI players if needed.',
          'Start the game and the whole deck is dealt out evenly. Some players may hold one card more than others; that\'s normal.',
          'Your hand is fanned at the bottom of the screen. Only you can see it.',
        ],
      },
      {
        heading: 'Making a claim',
        points: [
          'The rank to be played cycles in order: 2, 3, 4 … King, Ace, then back to 2. The app shows which rank is due this turn.',
          'On your turn, select 1–4 cards and play them face-down while claiming they are the current rank ("two Queens").',
          'You do NOT have to tell the truth — playing off-rank cards while claiming the rank is the heart of the game.',
          'You can\'t pass in the standard rules: if it\'s your turn, you must play at least one card, so sometimes you\'re forced to lie.',
        ],
      },
      {
        heading: 'Calling a bluff',
        points: [
          'Immediately after any play, every other player gets a moment to challenge — tap "Bluff!" if you don\'t believe the claim.',
          'On a challenge, the played cards are flipped for everyone to see.',
          'If even one card doesn\'t match the claim, the liar picks up the entire centre pile. If all cards match, the challenger takes the pile instead.',
          'If nobody challenges, the cards stay face-down on the pile and the next rank comes due.',
        ],
      },
      {
        heading: 'Reading the table',
        points: [
          'Tap any player\'s avatar to open their info card — card count and play history help you judge whether they could really hold what they claim.',
          'Track claims: if three Kings have already been claimed and someone claims two more, at least one is a lie.',
          'The first player to shed every card — and survive a final challenge — wins.',
        ],
      },
    ],
    screenshots: [
      { file: 'bluff/01-game-setup.png',  title: 'Set up the table',   caption: 'Bluff plays best with 3–6 — add AI players and deal the whole deck out.' },
      { file: 'bluff/02-deal.png',        title: 'All cards dealt',    caption: 'Hands are hidden; the claimed rank cycles 2 through Ace as the centre pile grows.' },
      { file: 'bluff/03-player-info.png', title: 'Know your opponents', caption: 'Tap a player to see their card count and history — spotting a pattern is half the game.' },
    ],
  },
  {
    slug: 'president',
    name: 'President',
    video: { youtubeId: 'l-QDZkwR1Os' },
    alternateNames: ['Daifugō', 'Scum', 'Asshole', 'Rich Man Poor Man', 'Satte Pe Satta (Indian variant)'],
    tagline: 'Climb the social ladder — or end up the Scum.',
    icon: '👑',
    players: '3–6 players', playerCount: '3–6',
    difficulty: 'Easy', comingSoon: true,
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
    playGuide: [
      {
        heading: 'Setting up the game',
        points: [
          'President seats 3 to 6 players and uses the standard deck, dealt out as evenly as possible.',
          'Card ranks run from 3 as the lowest up to 2 as the highest, which is the reversal that gives the game its character.',
          'The aim of every hand is simply to be the first to get rid of all your cards.',
          'Finishing order sets each player\'s rank for the next hand, and that rank is what the game is really about.',
        ],
      },
      {
        heading: 'The card exchange',
        points: [
          'From the second hand onwards, play opens with an exchange between the highest and lowest ranked players.',
          'The bottom player hands their best cards up, and the top player passes cards back down in return.',
          'That handicap makes staying at the top harder and climbing from the bottom genuinely difficult.',
          'The exchange happens before any cards are played, so you plan the hand already knowing what you gave and received.',
        ],
      },
      {
        heading: 'Playing a trick',
        points: [
          'The player in control leads one or more cards of the same rank — a single, a pair, three of a kind, and so on.',
          'Everyone after them must play the same number of cards, all of one rank, and beat what is showing.',
          'If you cannot or will not beat it, you pass. Passing puts you out of the trick until it clears.',
          'When everyone else has passed, the table clears and the last player to have played leads whatever they like.',
        ],
      },
      {
        heading: 'Ranks and winning',
        points: [
          'The first player to shed every card takes the top rank for the next hand; the last one left holding cards takes the bottom.',
          'Middle finishers fill the ranks in between, in the order they went out.',
          'Holding a pair or triple of high cards is usually stronger than the same cards spread across separate tricks, because multi-card leads shut out anyone who cannot match the count.',
          'Play as many hands as you like — the game has no fixed end, only the pecking order it produces.',
        ],
      },
    ],
  },
  {
    slug: 'war',
    name: 'War',
    video: { youtubeId: 'J5vT33Vo04s' },
    alternateNames: ['Battle', 'Bataille (French)'],
    tagline: 'Flip, battle, and collect every card.',
    icon: '⚔️',
    players: '2 players', playerCount: '2',
    difficulty: 'Easy', comingSoon: true,
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
    playGuide: [
      {
        heading: 'Setting up the game',
        points: [
          'War is strictly a two-player game. The full 52-card deck is split evenly, giving each player a face-down pile of 26 cards.',
          'You never choose anything in War — the entire game is decided by the order of the cards, which is what makes it a good first card game for children.',
          'Aces are high and suits are irrelevant. Only rank decides a battle.',
          'Cards you win go to the bottom of your pile, so the deck slowly cycles as the game runs.',
        ],
      },
      {
        heading: 'Fighting a battle',
        points: [
          'Both players flip the top card of their pile at the same time. This is a battle.',
          'The higher rank wins and takes both cards. Play then continues with the next battle.',
          'Because every card eventually comes back around, a run of bad luck early is rarely fatal.',
          'A game is capped at 500 battles, so a deck that keeps cycling without a winner is stopped rather than running forever.',
        ],
      },
      {
        heading: 'Going to war',
        points: [
          'When both flipped cards are the same rank, the battle is a tie and the game goes to war.',
          'Each player commits three cards face-down as the stake, then flips one more card face-up.',
          'The higher of those face-up cards wins everything on the table — both original cards, all six face-down stakes, and the two deciding cards.',
          'If the deciding cards tie again, another war starts on top of the first, so a single war can swing ten or more cards at once.',
        ],
      },
      {
        heading: 'Winning',
        points: [
          'You win by capturing all 52 cards, leaving your opponent with nothing to flip.',
          'If a player runs out of cards partway through a war, they cannot complete the stake and lose the game.',
          'If the battle cap is reached first, the player holding more cards at that point is ahead.',
          'There is no strategy to apply — the interest is entirely in the swings, and wars are where they happen.',
        ],
      },
    ],
  },
  {
    slug: 'crazy-eights',
    name: 'Crazy Eights',
    video: { youtubeId: '1c4YPQTS35I' },
    alternateNames: ['Mau-Mau (Germany)', 'Dos (Mexico)'],
    tagline: 'Match the suit or rank — 8s are always wild.',
    icon: '8️⃣',
    players: '2–6 players', playerCount: '2–6',
    difficulty: 'Easy', comingSoon: true,
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
    playGuide: [
      {
        heading: 'Setup and the deal',
        points: [
          'Crazy Eights uses a standard 52-card deck and suits 2 to 6 players. Deal 5 cards each with more than two players, or 7 in a two-player game.',
          'Turn one card face-up to start the discard pile and place the rest face-down as the draw pile.',
          'The aim is simply to be first to shed every card in your hand.',
          'If the starting card is an 8, bury it and turn another so the hand does not begin with a wild card.',
        ],
      },
      {
        heading: 'Playing a card',
        points: [
          'On your turn, play one card that matches the top of the discard pile by either suit or rank.',
          'If you cannot match, draw from the pile until you find a playable card, then play it. When the draw pile is empty and you still cannot play, your turn simply passes.',
          'Only the top card matters, so the suit in play changes constantly — a hand that looked unplayable a moment ago can open up.',
          'Shed high-value cards early. Anything you are still holding when someone goes out is counted against you.',
        ],
      },
      {
        heading: 'The power of eights',
        points: [
          'Any 8 can be played at any time, regardless of the suit or rank showing. This is the rule the whole game is built around.',
          'After playing an 8, you name the suit that the next player must follow, so an 8 is both an escape and a weapon.',
          'Call the suit you hold most of, or the one you suspect an opponent is void in.',
          'Hold at least one 8 in reserve rather than spending them early — an 8 is your guaranteed escape when the suit turns against you.',
        ],
      },
      {
        heading: 'Going out and scoring',
        points: [
          'The first player to shed every card wins the hand and the others count what remains in their hands.',
          'Penalty values: each 8 costs 50, face cards 10, Aces 1, and every other card its face value.',
          'Play to an agreed total, commonly 100 or 200 points. The player with the lowest score when someone crosses it wins the game.',
          'Many tables add special cards — 2s forcing a draw, Queens skipping the next player, Aces reversing direction. Agree which are in play before you start.',
        ],
      },
    ],
  },
  {
    slug: 'old-maid',
    name: 'Old Maid',
    video: { youtubeId: 'n6UFbZ0jGWw' },
    alternateNames: ['Babanuki (Japan)', 'Black Peter (Germany)', 'Donkey'],
    tagline: 'Don\'t be left holding the unpaired Queen.',
    icon: '👵',
    players: '2–6 players', playerCount: '2–6',
    difficulty: 'Easy', comingSoon: true,
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
    playGuide: [
      {
        heading: 'Setting up the game',
        points: [
          'Old Maid seats 2 to 8 players and uses a 51-card deck — one Queen is removed before the deal so that a single Queen can never be paired.',
          'All the cards are dealt out; some players may receive one more than others, which is fine.',
          'As soon as the cards are dealt, every player discards all the pairs already in their hand face-up.',
          'Only rank matters when pairing — any two Kings are a pair regardless of suit.',
        ],
      },
      {
        heading: 'Taking a card',
        points: [
          'On your turn you take one card, unseen, from the next player who still holds cards.',
          'If the card you take pairs with one in your hand, discard the pair immediately.',
          'If it does not pair, it stays in your hand and play moves on.',
          'Because you draw from a fanned hand, the position of the card is the only information you get.',
        ],
      },
      {
        heading: 'Going out',
        points: [
          'A player whose hand becomes empty is safe and out of the game for good.',
          'Play continues among the remaining players, so the pool of hands shrinks steadily.',
          'The unpaired Queen cannot be discarded — it can only be passed on when another player happens to take it.',
          'Everyone at the table eventually knows roughly who is holding it, which is where the fun comes from.',
        ],
      },
      {
        heading: 'Losing',
        points: [
          'The game ends when only one player is left holding a card, and that card is the odd Queen.',
          'That player is the Old Maid. There is no winner in the usual sense — everyone else simply escaped.',
          'If you are stuck with the Queen, try to keep your hand ordered so opponents cannot read your hesitation.',
          'Play a series of rounds and track who has been the Old Maid most often.',
        ],
      },
    ],
  },
  {
    slug: 'sevens',
    name: 'Sevens',
    video: { youtubeId: 'zAhNv7xpeYg' },
    alternateNames: ['Fan Tan', 'Parliament', 'Card Dominoes', 'Sevens (Indian)'],
    tagline: 'Build from 7 out — first to empty their hand wins.',
    icon: '7️⃣',
    players: '3–6 players', playerCount: '3–6',
    difficulty: 'Easy', comingSoon: true,
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
    playGuide: [
      {
        heading: 'Setting up the game',
        points: [
          'Sevens, also called Fan Tan or Parliament, seats 2 to 7 players and uses the full 52-card deck.',
          'Every card is dealt out, so hands are uneven when the player count does not divide 52 evenly.',
          'The player holding the seven of diamonds leads and must play it, which opens the first sequence.',
          'The table layout grows into four sequences, one per suit, each built outward from its seven.',
        ],
      },
      {
        heading: 'Playing a card',
        points: [
          'On your turn you play one card onto the layout, extending a sequence at either end.',
          'A sequence runs upward from its seven towards the King and downward towards the Ace.',
          'You may also open a new suit by playing that suit\'s seven, which is often the most valuable move available.',
          'Only the two ends of each suit are live, so at any moment there are at most eight legal cards in the whole deck.',
        ],
      },
      {
        heading: 'Passing',
        points: [
          'If you cannot play, you pass — but passing is only legal when you genuinely hold no playable card.',
          'That restriction is the heart of the game: you can never hold a card back to block an opponent if it is your only legal move.',
          'It also means being forced to play a card that unlocks a whole run for someone else is a normal, unavoidable part of Sevens.',
          'Watching which suits others pass on tells you a great deal about what they are holding.',
        ],
      },
      {
        heading: 'Winning',
        points: [
          'The first player to shed every card wins the hand.',
          'Cards next to a seven are the most valuable to hold, because releasing them opens the sequence for everybody.',
          'Sevens themselves are the strongest cards in the game — holding one keeps that suit closed entirely.',
          'The tension is between opening a suit you can use and keeping it shut on opponents who need it more.',
        ],
      },
    ],
  },
  {
    slug: 'snap',
    name: 'Snap',
    video: { youtubeId: '9cFOr2T2eb8' },
    tagline: 'Match the cards — and shout first.',
    icon: '👋',
    players: '2–6 players', playerCount: '2–6',
    difficulty: 'Easy', comingSoon: true,
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
    playGuide: [
      {
        heading: 'Setting up the game',
        points: [
          'Snap seats 2 to 8 players. The whole deck is dealt out face-down, as evenly as the player count allows.',
          'Each player keeps their pile face-down and builds a personal face-up stack in front of them as they play.',
          'Only rank matters — suits and colours are ignored entirely.',
          'The game is a pure reaction test, so it works well across very mixed ages.',
        ],
      },
      {
        heading: 'Flipping and snapping',
        points: [
          'Players take turns flipping the top card of their pile onto their own face-up stack.',
          'Whenever the top cards of any two players\' face-up stacks show the same rank, the match is live and anyone at the table may call it.',
          'The first player to call Snap wins both of those matching stacks and adds them to the bottom of their pile.',
          'Because a match can appear between any two stacks, you have to watch the whole table rather than just your own cards.',
        ],
      },
      {
        heading: 'False snaps',
        points: [
          'Calling Snap when no two top cards match is a false snap, and it carries a real cost.',
          'The false snapper pays one card to every other player still in the game, so a wrong call in a big group is expensive.',
          'That penalty is the only brake on the game — without it the correct tactic would be to call constantly.',
          'Watch for players who call early and often; they bleed cards steadily even when they win some piles.',
        ],
      },
      {
        heading: 'Winning',
        points: [
          'A player who runs out of cards is out of the game, and play continues without them.',
          'The last player still holding cards wins.',
          'A single successful snap late in the game can hand you a huge stack, so being behind is rarely permanent.',
          'The game is capped at 1,000 flips to stop an endless cycle when nobody manages a clean snap.',
        ],
      },
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
    video: { youtubeId: '3Pj7y_vOs7Q' },
    seo: { title: 'How to Play Hearts Online – Rules & Strategy | Vanikar', h1: 'How to Play Hearts' },
    relatedGames: ['spades', 'whist', 'euchre', 'president'],
    extraFaqs: [
      { q: 'What is the Queen of Spades worth in Hearts?',
        a: 'The Queen of Spades (Q♠) is worth 13 penalty points — as much as all thirteen hearts combined. Avoiding her, or forcing her onto an opponent, is the heart of the game.' },
      { q: 'What does shooting the moon mean in Hearts?',
        a: 'Shooting the moon means deliberately capturing ALL 13 hearts and the Queen of Spades in one hand. Instead of taking 26 penalty points, you score zero and every other player takes 26.' },
      { q: 'Can Hearts be played with two players?',
        a: 'Traditional Hearts is a strict four-player game. On Vanikar you can play with fewer humans by filling the remaining seats with AI opponents — two friends plus two AI players works great.' },
    ],
    tagline: 'Avoid the hearts — and beware the Queen of Spades.',
    icon: '♥',
    players: '4 players', playerCount: '4',
    difficulty: 'Medium',
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
    playGuide: [
      {
        heading: 'Setting up your table',
        points: [
          'Hearts is a strict 4-player game — take one seat and fill the other three with AI opponents.',
          'Each player card at the top of the table shows round points and running total, so you always know who\'s in danger of reaching 100.',
          'All 52 cards are dealt: 13 to each player, fanned at the bottom of your screen.',
        ],
      },
      {
        heading: 'The pass',
        points: [
          'Before play, select exactly 3 cards to pass: round 1 passes left, round 2 right, round 3 across, and round 4 keeps all cards (no pass).',
          'Passing well matters more than any single trick: ship out your high spades (A♠, K♠) unless well protected, and dangerous high hearts.',
          'You receive 3 cards in return — check your new hand before planning the round.',
        ],
      },
      {
        heading: 'Trick play',
        points: [
          'The player holding the 2♣ leads it to the first trick — the app enforces this automatically.',
          'You must follow the led suit if you can; the app highlights your legal cards. If you\'re void, discard anything — this is how hearts and the Q♠ get dumped.',
          'There is no trump: the highest card of the led suit wins the trick and leads the next one.',
          'Hearts can\'t be led until a heart has been discarded on an earlier trick ("breaking hearts"), unless you hold nothing but hearts.',
          'On the very first trick you may not drop a heart or the Q♠ (unless your hand forces it).',
        ],
      },
      {
        heading: 'Scoring and the Moon',
        points: [
          'At the end of each hand: every heart taken = 1 point, the Q♠ = 13 points. Points are bad — lowest total wins.',
          'Shooting the Moon: if one player captures ALL 13 hearts and the Q♠, they score 0 and everyone else gets 26.',
          'The game ends when any player reaches 100 points; the player with the lowest score at that moment wins.',
        ],
      },
    ],
    screenshots: [
      { file: 'hearts/01-game-setup.png', title: 'Set up the table', caption: 'Hearts is a 4-player game — fill the remaining seats with AI and start.' },
      { file: 'hearts/02-deal.png',       title: '13 cards each',    caption: 'The full deck is dealt; every player card shows round and total penalty points.' },
      { file: 'hearts/03-pass.png',       title: 'Pass three cards', caption: 'Select 3 cards to pass — the direction rotates each round, and the fourth round has no pass.' },
      { file: 'hearts/04-gameplay.png',   title: 'Trick play',       caption: 'Follow the led suit if you can; the highest card of that suit takes the trick.' },
    ],
  },
  {
    slug: 'spades',
    name: 'Spades',
    video: { youtubeId: '6pVvbbpbrlk' },
    seo: { title: 'How to Play Spades Online – Rules & Strategy | Vanikar', h1: 'How to Play Spades' },
    relatedGames: ['hearts', 'whist', 'euchre', 'belote'],
    tagline: 'Bid smart. Spades are always trump.',
    icon: '♠',
    players: '4 players (2 teams)', playerCount: '4',
    difficulty: 'Medium',
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
    playGuide: [
      {
        heading: 'Setting up your table',
        points: [
          'Spades is 4 players in two fixed partnerships — you and the seat across from you are Team A; the other two are Team B.',
          'Each player card shows bid, tricks taken, team score, and bags at all times, so you can read the state of the hand at a glance.',
          '13 cards are dealt to each player. Use the arrange helper to sort your hand by suit before bidding.',
        ],
      },
      {
        heading: 'Bidding',
        points: [
          'Starting left of the dealer, each player bids the number of tricks they expect to personally win (0–13). Your team\'s contract is the sum of both partners\' bids.',
          'Count likely winners: Aces and Kings in side suits, plus long spades. A typical starting hand bids 3–4.',
          'Bidding 0 is "Nil" — a bold declaration that you\'ll win no tricks at all. Made Nil = +100, failed Nil = −100, on top of your partner\'s normal bid.',
          'In the app, use the +/− dialog to set your number and tap "Place Bid." Both teams\' totals are shown as bids come in.',
        ],
      },
      {
        heading: 'Trick play',
        points: [
          'The player left of the dealer leads the first trick. You must follow the led suit if you can — the app highlights legal plays.',
          'Spades are always trump: if any spade is played to a trick, the highest spade wins it; otherwise the highest card of the led suit wins.',
          'You may not LEAD spades until they\'re "broken" — a spade discarded on another suit\'s trick — unless spades are all you have left.',
          'The trick winner leads next. Keep counting: how many spades are out, and how many tricks your team still needs.',
        ],
      },
      {
        heading: 'Scoring, bags, and winning',
        points: [
          'Make your team contract and you score 10 × bid. Fall short and you LOSE 10 × bid.',
          'Every trick over your bid is a "bag" worth +1 — but collect 10 bags and your team is docked 100 points. Don\'t hoard cheap tricks.',
          'Nil results are scored separately from the partner\'s bid. Blind Nil (bid before looking at your cards) doubles the stakes to ±200.',
          'First team to 500 points wins the match.',
        ],
      },
    ],
    screenshots: [
      { file: 'spades/01-game-setup.png', title: 'Set up the table',  caption: 'Four players in two teams — you partner the seat across from you.' },
      { file: 'spades/02-deal.png',       title: 'The deal',          caption: '13 cards each, with team score and bags tracked on every player card.' },
      { file: 'spades/03-arrange-help.png', title: 'Arrange your hand', caption: 'Sort by suit and rank with the arrange helper before deciding your bid.' },
      { file: 'spades/04-bid.png',        title: 'Place your bid',    caption: 'Count your sure tricks and bid — 0 declares a daring Nil worth ±100.' },
      { file: 'spades/05-gameplay.png',   title: 'Trick play',        caption: 'Spades always trump but can\'t be led until broken; bids, tricks, and bags update live.' },
    ],
  },
  {
    slug: 'gin-rummy',
    name: 'Gin Rummy',
    video: { youtubeId: 'Uy063oI9Gkk' },
    seo: { title: 'How to Play Gin Rummy Online – Rules & Strategy | Vanikar', h1: 'How to Play Gin Rummy' },
    relatedGames: ['indian-rummy', 'canasta', 'buraco', 'chinchon'],
    tagline: 'Knock before they do.',
    icon: '🍸',
    players: '2 players', playerCount: '2',
    difficulty: 'Medium',
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
    playGuide: [
      {
        heading: 'Setting up the game',
        points: [
          'Gin Rummy is heads-up: you against one opponent, racing to 100 points across multiple hands.',
          'Each player gets 10 cards. One card is flipped face-up to start the discard pile; the rest sit face-down as the stock with a live counter ("Draw: 31").',
          'On the first turn the non-dealer may take the face-up card or decline; if both decline, the non-dealer draws from stock and play begins.',
        ],
      },
      {
        heading: 'Arranging your hand',
        points: [
          'Use the sort bar at the bottom to instantly arrange your hand: by suit (C D H S) or by rank (A→2), then confirm with the check mark.',
          'Group toward melds: a SET is 3–4 cards of the same rank; a RUN is 3+ consecutive cards of the same suit (Aces are low).',
          'Everything not in a meld is "deadwood," counted at face value (face cards 10, Ace 1). Your whole game is about shrinking that number.',
        ],
      },
      {
        heading: 'Draw, then discard',
        points: [
          'Each turn has exactly two actions: draw one card (from the stock or the top of the discard pile), then discard one card face-up.',
          'Taking from the discard pile telegraphs what you\'re collecting — sometimes drawing blind from stock is worth the privacy.',
          'Watch what your opponent picks up and never feed the cards they want.',
        ],
      },
      {
        heading: 'Knocking, Gin, and scoring',
        points: [
          'When your deadwood totals 10 or less you may "knock": discard face-down and reveal your melds.',
          'Your opponent then lays off any of their cards that fit YOUR melds, shrinking their own deadwood, and the difference in deadwood goes to the knocker.',
          'If the opponent\'s final deadwood is equal or lower, they "undercut" you: they score the difference plus a 25-point bonus.',
          'GIN — knocking with zero deadwood — earns a 25-point bonus and blocks all layoffs.',
          'Hands repeat until someone reaches 100 points; bonuses for each hand won are added at the end.',
        ],
      },
    ],
    screenshots: [
      { file: 'gin-rummy/01-game-setup.png', title: 'Set up the game', caption: 'Heads-up Gin Rummy — two players, first to 100 points.' },
      { file: 'gin-rummy/02-deal.png',       title: 'The deal',        caption: 'Ten cards each; the stock shows a live draw counter and one card starts the discard pile.' },
      { file: 'gin-rummy/03-arrange.png',    title: 'Sort your hand',  caption: 'One tap sorts by suit or rank (C D H S / A→2) — spot your sets and runs instantly.' },
      { file: 'gin-rummy/04-gameplay.png',   title: 'Draw and discard', caption: 'Draw from stock or the discard, build melds, then discard — knock when deadwood is 10 or less.' },
    ],
  },
  {
    slug: 'euchre',
    name: 'Euchre',
    video: { youtubeId: 'MLOS84a6FtQ' },
    tagline: 'Name the trump. Take three tricks. Prove your Right Bower.',
    icon: '🪄',
    players: '4 players (2 teams)', playerCount: '4',
    difficulty: 'Hard', comingSoon: true,
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
    playGuide: [
      {
        heading: 'The deck and the bowers',
        points: [
          'Euchre uses a stripped 24-card deck — only 9, 10, Jack, Queen, King and Ace in each suit. Four players sit in two fixed partnerships, opposite each other.',
          'Everyone is dealt 5 cards in packets of 2 and 3, and the next card is turned face-up to propose a trump suit.',
          'The two most important cards are the bowers. The Jack of the trump suit is the Right Bower — the highest card in the game. The Jack of the same colour is the Left Bower, second highest.',
          'The Left Bower stops being its printed suit for the whole hand. If Spades are trump, the Jack of Clubs is a Spade — you cannot follow a Club lead with it.',
        ],
      },
      {
        heading: 'Naming trump',
        points: [
          'First round: starting left of the dealer, each player may order up the turned card as trump or pass. If someone accepts, the dealer picks it up and discards a card face-down.',
          'Second round: if all four pass, players may name any other suit as trump — but never the suit that was just turned down.',
          'If all four pass again, the hand is dead and the deal moves on. Some tables play stick the dealer, forcing the dealer to name a suit rather than pass.',
          'Judge your hand before calling: three trumps, or two trumps plus an off-suit Ace, is a reasonable call. Both bowers is very strong.',
        ],
      },
      {
        heading: 'Playing the hand',
        points: [
          'The player left of the dealer leads the first trick. You must follow the led suit if you can; otherwise play anything, including trump.',
          'The highest trump wins the trick, or the highest card of the led suit if no trump is played. The winner leads the next trick.',
          'Trump ranks high to low: Right Bower, Left Bower, Ace, King, Queen, 10, 9. Non-trump suits rank normally, Ace high.',
          'Count trump as it appears. With only five tricks per hand, knowing that both bowers have gone decides how hard you can push.',
        ],
      },
      {
        heading: 'Scoring and going alone',
        points: [
          'The team that named trump must win at least 3 of the 5 tricks. Taking 3 or 4 scores 1 point; taking all 5 — a march — scores 2.',
          'Fail to take 3 and you are euchred: the opposing team scores 2 points instead. That penalty is what makes reckless calls expensive.',
          'Going alone: the caller may bench their partner and play the hand solo. A solo march scores 4 points, making it the fastest route to victory.',
          'First team to 10 points wins the match.',
        ],
      },
    ],
  },
  {
    slug: 'cribbage',
    name: 'Cribbage',
    video: { youtubeId: 'bzRHjdS2VAE' },
    seo: { title: 'How to Play Cribbage Online – Rules & Strategy | Vanikar', h1: 'How to Play Cribbage' },
    relatedGames: ['gin-rummy', 'whist', 'hearts', 'euchre'],
    tagline: 'Peg your way to 121 — every combination counts.',
    icon: '📌',
    players: '2 players', playerCount: '2',
    difficulty: 'Hard',
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
    playGuide: [
      {
        heading: 'Setting up the game',
        points: [
          'Cribbage is heads-up in the app: you versus one opponent, racing pegs to 121 points on the board.',
          'Six cards are dealt to each player. The board and both players\' peg tracks are shown on the table throughout.',
          'Scores peg IMMEDIATELY as they happen — the first peg to touch 121 wins on the spot, even mid-hand.',
        ],
      },
      {
        heading: 'The crib and the starter',
        points: [
          'Both players choose 2 of their 6 cards to throw into the "crib" — a third hand that scores for the DEALER at the end of the hand.',
          'When you\'re dealer, feed the crib with pairs and cards that make 15s (especially 5s). When you\'re not, throw it your most useless, disconnected cards.',
          'The deck is then cut and the top card flipped as the "starter" — it counts as a fifth card in every hand at counting time. A Jack starter pegs the dealer 2 immediately ("His Heels").',
        ],
      },
      {
        heading: 'The play (pegging)',
        points: [
          'Players alternate laying one card face-up, announcing the running total, which may never exceed 31.',
          'Peg as you play: making the total exactly 15 = 2 points; a pair with the previous card = 2 (triple = 6, quad = 12); completing a run of 3+ in any order = 1 per card.',
          'If you can\'t play without passing 31, say "Go" — your opponent pegs 1, plays any cards they still can, and the count resets to 0.',
          'Playing the last card of the whole pegging phase scores 1 ("last card"), or 2 if it lands exactly on 31.',
        ],
      },
      {
        heading: 'Counting hands',
        points: [
          'Hands are counted in strict order: non-dealer first, then dealer\'s hand, then the crib — order matters in tight endgames near 121.',
          'Count every combination with the starter included: each 15 = 2, each pair = 2, runs = 1 per card, a 4-card flush = 4 (5 with starter), and the Jack matching the starter\'s suit = 1 ("His Nobs").',
          'Combinations stack: 7-8-8-9 holds two 15s, a pair, and two runs of three — 16 points before the starter helps.',
          'The app\'s round summary breaks down every hand\'s count, so you can check what you missed.',
        ],
      },
    ],
    screenshots: [
      { file: 'cribbage/01-game-setup.png',  title: 'Set up the game',  caption: 'Heads-up Cribbage — race your pegs to 121.' },
      { file: 'cribbage/02-before-deal.png', title: 'The board is set', caption: 'Peg tracks ready, deck shuffled — six cards each are on the way.' },
      { file: 'cribbage/03-after-deal.png',  title: 'Feed the crib',    caption: 'Throw 2 of your 6 cards to the crib — it scores for the dealer, so feed it or starve it.' },
      { file: 'cribbage/04-pegging.png',     title: 'The play',         caption: 'Alternate cards toward 31, pegging 15s, pairs, and runs as they happen.' },
      { file: 'cribbage/05-counting.png',    title: 'The show',         caption: 'Hands are counted in order — non-dealer, dealer, then the crib, all with the starter card.' },
      { file: 'cribbage/06-result.png',      title: 'Round summary',    caption: 'Every hand\'s count is broken down as the pegs race down the board.' },
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
    video: { youtubeId: 'QYEMpDoN0Mw' },
    alternateNames: ['Basket'],
    tagline: 'Build 7-card melds and go out first.',
    icon: '🧺',
    players: '4 players (2 teams)', playerCount: '4',
    difficulty: 'Medium', comingSoon: true,
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
    playGuide: [
      {
        heading: 'Setup and the deal',
        points: [
          'Canasta uses two full decks plus four Jokers — 108 cards. Four players form two partnerships sitting opposite each other.',
          'Each player is dealt 11 cards. One card starts the discard pile; if it is a wild card or a red 3, another is turned on top of it.',
          'Threes are never melded in the app’s baseline mode — they are simply discard fodder, so do not hold them hoping to build on them.',
          'On your turn you either draw two cards from the stock or take the entire discard pile, then meld if you wish, and finish by discarding one card.',
        ],
      },
      {
        heading: 'Melding and wild cards',
        points: [
          'A meld is three or more cards of the same rank laid face-up in front of your partnership. Suits are irrelevant — only rank matters.',
          'Jokers and 2s are wild and can stand in for any natural card, but a meld can never contain more wild cards than natural ones.',
          'A meld needs at least three cards, and it must contain at least two natural cards — so wilds can never outnumber the real cards in a meld.',
          'Melds belong to the partnership, not the player, so either partner can extend a meld the other one started.',
        ],
      },
      {
        heading: 'Taking the discard pile',
        points: [
          'Taking the pile is the big swing in Canasta — it can hand you a dozen cards at once, so most of the strategy is about earning the right to take it and denying it to opponents.',
          'To take it you must be able to use the top card immediately, either by matching it with two natural cards from your hand or by adding it to a meld your side already holds.',
          'Watch what opponents discard and what they take — the pile is the fastest way for either side to gain cards, so denying it matters as much as building your own melds.',
          'Jokers and 2s are wild and can stand in for any rank, but each one you spend is a card you cannot use to make a clean canasta later.',
        ],
      },
      {
        heading: 'Canastas, going out, and scoring',
        points: [
          'A canasta is a completed meld of seven or more cards. A natural canasta, with no wild cards, scores 500; a mixed one scores 300.',
          'Your partnership must have at least one canasta before either player may go out, so completing the first one is the real objective of the hand.',
          'Going out means playing or discarding your final card, which ends the hand immediately for everyone.',
          'Score card values on top of the bonuses: Jokers 50, 2s and Aces 20, Kings down to 8s 10 each, and 7s down to 4s 5 each. Cards still in hand count against you. First side to 5,000 wins.',
        ],
      },
    ],
  },
  {
    slug: 'buraco',
    name: 'Buraco',
    video: { youtubeId: '9RNZFgqPR9E' },
    tagline: 'Complete your canastas — then grab the pot.',
    icon: '🇧🇷',
    players: '4 players (2 teams)', playerCount: '4',
    difficulty: 'Medium', comingSoon: true,
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
    playGuide: [
      {
        heading: 'Setting up the game',
        points: [
          'Buraco seats 2 to 4 players and uses two full decks plus all four jokers — 108 cards in total.',
          'Each player is dealt eleven cards, and two face-down piles of eleven, the pozzetti, are set aside as pots.',
          'One pot belongs to each side and is picked up later in the hand, which gives Buraco its distinctive second wind.',
          'A turn is always the same shape: draw or take the discard pile, then meld if you wish, then discard.',
        ],
      },
      {
        heading: 'Melds',
        points: [
          'Unlike Canasta, Buraco melds can be either sets of the same rank or runs of consecutive cards in one suit.',
          'A meld needs at least three cards, and runs are the backbone of the game.',
          'A meld may contain at most one wild card, so wilds are far scarcer here than in Canasta.',
          'Melds belong to the partnership, so either partner can extend one the other started.',
        ],
      },
      {
        heading: 'The pot',
        points: [
          'When you play your last card, your side immediately picks up its pot of eleven cards and keeps playing.',
          'That means emptying your hand early is not the end of the hand — it is the gateway to the second half.',
          'Because the pot is a fixed eleven cards, timing when to take it is a real tactical decision.',
          'A side that has already used its pot has nothing left to fall back on.',
        ],
      },
      {
        heading: 'Winning',
        points: [
          'A buraco is a completed meld of seven or more cards, and your side must have one before it can go out.',
          'A clean buraco, made with no wild card at all, is worth considerably more than one containing a wild.',
          'You cannot go out until your pot has been taken and a buraco completed, so the hand has a natural three-stage rhythm.',
          'Cards left in hand when an opponent goes out count against your side.',
        ],
      },
    ],
  },
  {
    slug: 'chinchon',
    name: 'Chinchón',
    video: { youtubeId: '2mXzkTzXlnU' },
    alternateNames: ['Chinchón', 'Chinchon'],
    tagline: 'Form your runs and sets — Chinchón closes the round instantly.',
    icon: '🇦🇷',
    players: '2–6 players', playerCount: '2–6',
    difficulty: 'Medium', comingSoon: true,
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
    playGuide: [
      {
        heading: 'Setting up the game',
        points: [
          'Chinchon seats 2 to 6 players, and each player is dealt seven cards.',
          'One card is turned face-up to start the discard pile, and the rest form the face-down stock.',
          'The aim is to arrange your hand into combinations and leave as little unmatched as possible.',
          'It plays much like rummy, but the seven-card hand makes rounds short and sharp.',
        ],
      },
      {
        heading: 'Melds and deadwood',
        points: [
          'A run is three or more consecutive cards of the same suit. A set is three or more cards of the same rank.',
          'Anything not part of a run or set is deadwood, and deadwood is what you score against.',
          'Aces count 1, numbered cards their face value, and court cards 10 each.',
          'Because court cards are the most expensive to be caught with, shedding them early is usually right.',
        ],
      },
      {
        heading: 'Taking a turn',
        points: [
          'Each turn is the same two steps: draw one card, then discard one.',
          'You may draw the face-down top of the stock, or take the visible card from the discard pile.',
          'Taking from the discard tells everyone something about what you are building, so the free information has a price.',
          'Watch what opponents pick up, and avoid discarding anything that extends what they are collecting.',
        ],
      },
      {
        heading: 'Closing the round',
        points: [
          'When your unmatched cards total five points or fewer, you may close the round with your discard.',
          'Everyone then reveals and counts their deadwood, which is added to their running total.',
          'Chinchon is the perfect hand — a single run of all seven cards in one suit — and it wins outright.',
          'Points are penalties, so the aim across the game is the lowest total. Players who climb past the agreed limit drop out.',
        ],
      },
    ],
  },
  {
    slug: 'briscola',
    name: 'Briscola',
    video: { youtubeId: 'lEk_8GlwjzA' },
    alternateNames: ['Brisca (Spain)', 'Briscola (Italy)', 'Bisca (Brazil)'],
    tagline: 'Take the high-value cards — trump beats everything else.',
    icon: '🍷',
    players: '2–4 players', playerCount: '2–4',
    difficulty: 'Medium', comingSoon: true,
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
    playGuide: [
      {
        heading: 'Setting up the game',
        points: [
          'Briscola seats 2 to 4 players and uses a 40-card deck — the eights, nines and tens are removed from a standard pack.',
          'Each player is dealt three cards, and one further card is turned face-up to set the briscola, the trump suit for the whole game.',
          'That trump card is slid partly under the remaining stock and is the very last card taken as the stock runs down.',
          'After every trick each player draws back up to three cards, so hands stay at three until the stock is exhausted.',
        ],
      },
      {
        heading: 'Card values',
        points: [
          'The deck holds exactly 120 points, and the whole game is a race to capture more than half of them.',
          'Aces are worth 11 and threes are worth 10, which makes those two ranks far more valuable than their trick-taking power suggests.',
          'Kings are worth 4, Queens 3 and Jacks 2. Everything else is worth nothing at all.',
          'That gap means a trick can be worth 21 points or nothing, and knowing which is which is most of the skill.',
        ],
      },
      {
        heading: 'Playing a trick',
        points: [
          'There is no obligation to follow suit in Briscola — you may play any card at any time.',
          'The highest trump in a trick wins it. If no trump is played, the strongest card of the suit that was led wins.',
          'Because following suit is optional, discarding a worthless card on a trick you cannot win is a routine and important move.',
          'The trick winner leads the next one, and both players draw a replacement card before it begins.',
        ],
      },
      {
        heading: 'Winning',
        points: [
          'Count the points on the cards you captured once every trick has been played. More than 60 of the 120 wins.',
          'Exactly 60 each is a draw, which happens more often than you might expect.',
          'In the four-player partnership game, partners combine their captured points at the end.',
          'Save your trumps for tricks that actually carry points — trumping a worthless trick wins the cards but gains nothing.',
        ],
      },
    ],
  },
  {
    slug: 'truco',
    name: 'Truco',
    video: { youtubeId: 'I_nZY0KGbXo' },
    tagline: 'Bluff, bet, and outwit — Latin America\'s card game.',
    icon: '🌶️',
    players: '2–4 players', playerCount: '2 or 4',
    difficulty: 'Hard', comingSoon: true,
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
    playGuide: [
      {
        heading: 'Setting up the game',
        points: [
          'Truco is played by two or four people, with partnerships sitting opposite each other in the four-player game.',
          'Each player receives three cards from a 40-card deck, and each hand is decided over three quick tricks.',
          'There is no trump suit. Instead the cards follow a fixed power order that has to be learned.',
          'The real game is not the tricks themselves but the betting that runs alongside them.',
        ],
      },
      {
        heading: 'Envido',
        points: [
          'Envido is a side bet on card points, called before the second card of the first trick is played.',
          'Your envido score comes from two cards of the same suit in your hand, added together with a bonus.',
          'The opponent may accept, decline, or raise. Declining concedes a smaller number of points immediately.',
          'Falta Envido is the largest raise available, staking everything still needed to win the game.',
        ],
      },
      {
        heading: 'Truco bidding',
        points: [
          'At your turn you may call Truco, raising what the hand itself is worth.',
          'Your opponent accepts, folds, or raises again to Retruco, and from there to Vale Cuatro.',
          'Folding hands over the current stake without playing on, which is often the right choice with a weak hand.',
          'Because you can call with any hand at all, Truco rewards bluffing more than almost any other trick-taking game.',
        ],
      },
      {
        heading: 'Winning the hand',
        points: [
          'Whoever wins two of the three tricks wins the hand and collects whatever it was worth after the bidding.',
          'A hand nobody raised is worth the base amount, so calling is how you make a good hand pay.',
          'In partnership play, legal signalling between partners about card strength is part of the tradition.',
          'Play continues until a side reaches the agreed target, with the escalating bets making late hands decisive.',
        ],
      },
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
    video: { youtubeId: 'z2Jas5t-8Yw' },
    alternateNames: ['Thirteen', 'Vietnamese Cards', 'Thirteen Cards'],
    tagline: 'Vietnam\'s Big Two — shed your cards before anyone else.',
    icon: '🇻🇳',
    players: '4 players', playerCount: '4',
    difficulty: 'Medium', comingSoon: true,
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
    playGuide: [
      {
        heading: 'Setting up the game',
        points: [
          'Tien Len seats 2 to 4 players, and each player is dealt thirteen cards.',
          'Ranks run 3 as the lowest through to 2 as the highest, and suits break ties in the order spades, clubs, diamonds, hearts.',
          'The player holding the lowest card in the deal leads first, which is normally the three of spades.',
          'The aim is simply to be the first to shed every card.',
        ],
      },
      {
        heading: 'Playing a combination',
        points: [
          'The leader may play a single card, a pair, a triple, or a five-card combination such as a straight or a full house.',
          'Everyone after them must play the same shape, only higher, or pass.',
          'Passing removes you from the current trick entirely — you cannot rejoin it even if you later wish you had played.',
          'When everyone has passed, the table clears and whoever played last leads a fresh combination of their choice.',
        ],
      },
      {
        heading: 'Twos and bombs',
        points: [
          'The 2 is the highest single card in the game and normally beats anything played as a single.',
          'Bombs are the exception. Four of a kind beats a lone 2 outright, and can also take out a pair of 2s.',
          'That makes holding 2s powerful but not safe, and it makes collecting four of a kind worth the effort.',
          'Because passing locks you out of a trick, timing a bomb is as important as holding one.',
        ],
      },
      {
        heading: 'Winning',
        points: [
          'The first player to play their final card wins the hand.',
          'Count your escape route before you start shedding — a hand with one unplayable low card can strand you at the end.',
          'Leading long straights early tends to be efficient, because they are hard for opponents to match.',
          'Keeping one high single in reserve gives you a way to seize control late in the hand.',
        ],
      },
    ],
  },
  {
    slug: 'koi-koi',
    name: 'Koi-Koi',
    video: { youtubeId: 'PB94VwGc89U' },
    alternateNames: ['こいこい', 'Hanafuda', 'Flower Cards'],
    tagline: 'Match the flowers — say "Koi-Koi" to risk it all.',
    icon: '🌸',
    players: '2 players', playerCount: '2',
    difficulty: 'Hard', comingSoon: true,
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
    playGuide: [
      {
        heading: 'Setting up the game',
        points: [
          'Koi-Koi is played by exactly two people with a 48-card hanafuda deck — twelve months of four cards each.',
          'Each player receives eight cards, and eight more are dealt face-up to the table between them.',
          'Cards are matched by month, not by number, so the twelve months function like suits.',
          'The rest of the deck sits face-down as the draw pile.',
        ],
      },
      {
        heading: 'Capturing cards',
        points: [
          'On your turn, play a card from your hand that matches the month of a card on the table, and take both into your capture pile.',
          'Then turn the top card of the draw pile. If it matches a month on the table, capture that pair too.',
          'If either card has no match, it simply stays on the table as a target for later.',
          'So a single turn can capture nothing, two cards, or four.',
        ],
      },
      {
        heading: 'Card types and yaku',
        points: [
          'Captured cards fall into categories worth different amounts: Brights are worth 20, Animals 10, and the plain Chaff cards 1 each.',
          'Certain named combinations of captured cards form yaku, and completing one is what actually scores.',
          'The Brights are the highest-value cards in the deck, so watching which ones remain unclaimed shapes the whole round.',
          'Ribbons and Animals form several of the more achievable combinations.',
        ],
      },
      {
        heading: 'Koi-Koi or Shobu',
        points: [
          'The moment you complete a yaku you face the game\'s only real decision.',
          'Call Shobu to stop the round immediately and bank the points you have earned.',
          'Call Koi-Koi to carry on, aiming for a bigger combination — but if your opponent completes a yaku first, you lose what you were holding.',
          'That gamble is the whole game. Calling Koi-Koi with few cards left in hand is usually a poor bet.',
        ],
      },
    ],
  },
  {
    slug: 'big-two',
    video: { youtubeId: 'U28DKiVQpVM', start: 25 },
    seo: { title: 'How to Play Big Two Online – Rules & Strategy | Vanikar', h1: 'How to Play Big Two' },
    relatedGames: ['tien-len', 'president', 'sevens', 'indian-jackass'],
    name: 'Big Two',
    alternateNames: ['大老二', 'Deuces', 'Cho Dai Di', 'Pusoy Dos (Philippines)'],
    tagline: 'The 2 rules — race to empty your hand.',
    icon: '2️⃣',
    players: '2–4 players', playerCount: '2–4',
    difficulty: 'Medium',
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
    playGuide: [
      {
        heading: 'Setting up your table',
        points: [
          'Big Two seats 2–4 players; with 4 players the whole deck is dealt, 13 cards each.',
          'Remember the two rankings that make Big Two unique: card ranks run 3 (lowest) up to 2 (highest), and suits rank ♦ < ♣ < ♥ < ♠ for breaking ties.',
          'The player holding the 3♦ opens the game and must include it in their first play.',
        ],
      },
      {
        heading: 'Legal combinations',
        points: [
          'You can play a single card, a pair (same rank), a triple (same rank), or a five-card poker hand.',
          'Five-card hands rank, low to high: Straight < Flush < Full House < Four-of-a-Kind (+ kicker) < Straight Flush.',
          'Within the same type, compare the key card: highest card in a straight, rank of the triple in a full house, and so on — suits break exact ties.',
        ],
      },
      {
        heading: 'Beating the current play',
        points: [
          'Each play must beat the previous one using the SAME shape: a pair over a pair, a single over a single, a five-card hand over a five-card hand.',
          'Exception: Four-of-a-Kind and Straight Flush hands beat ANY lower five-card combination — they\'re the closest thing to a bomb.',
          'Can\'t (or don\'t want to) beat it? Pass. Passing doesn\'t lock you out of later turns in the same round.',
          'When everyone else passes in a row, the pile clears and the last player to play starts a completely fresh lead with anything they like.',
        ],
      },
      {
        heading: 'Ending a hand and penalties',
        points: [
          'First player to shed all 13 cards wins the hand; remaining players are penalized per card left.',
          'Penalties escalate: 10–12 cards left counts double, and being caught with all 13 counts triple — never sit on a full hand hoping for perfect plays.',
          'Watch the 2s: a single 2 can only be beaten by a four-of-a-kind or straight flush, so time yours for maximum damage.',
        ],
      },
    ],
    screenshots: [
      { file: 'big-two/01-game-setup.png', title: 'Set up the table', caption: 'Two to four players — with four, the whole deck is dealt.' },
      { file: 'big-two/02-deal.png',       title: 'The deal',         caption: '13 cards each; ranks run 3 low to 2 high, with suits ♦ ♣ ♥ ♠ breaking ties.' },
      { file: 'big-two/03-gameplay.png',   title: 'Beat the play',    caption: 'Match the shape and go higher — or pass and wait for a fresh lead.' },
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
    video: { youtubeId: 'WvcAI2omY64' },
    alternateNames: ['Rung', 'Rang', 'Coat Piece', 'Hokm (Iran)'],
    tagline: 'Win 7 tricks first — then defend in the second half.',
    icon: '🏛️',
    players: '4 players (2 teams)', playerCount: '4',
    difficulty: 'Medium', comingSoon: true,
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
    playGuide: [
      {
        heading: 'Setting up the game',
        points: [
          'Court Piece, also called Rung, is a four-player partnership game with partners sitting opposite each other.',
          'It uses the full 52-card deck and every card is dealt, giving each player thirteen in total.',
          'The deal is split. Five cards go to each player first, and the rest follow only after trump has been named.',
          'That split is what makes the trump call a genuine decision rather than a formality.',
        ],
      },
      {
        heading: 'Naming trump',
        points: [
          'The trump caller looks at their first five cards only and names the trump suit, the rang, from those.',
          'You are committing on incomplete information — eight of your thirteen cards are still unseen.',
          'Call your longest and strongest suit among the five rather than simply your highest card.',
          'Once trump is named, the remaining cards are dealt and the hand begins.',
        ],
      },
      {
        heading: 'Playing tricks',
        points: [
          'The player to the caller\'s side leads, and you must follow the suit led if you are able.',
          'If you are void in the led suit you may play anything, including a trump.',
          'The highest trump in the trick wins it; with no trump played, the highest card of the led suit takes it.',
          'The winner of each trick leads the next, so control of the lead passes with the cards.',
        ],
      },
      {
        heading: 'Winning',
        points: [
          'The target is seven tricks — the first partnership to reach that number claims the hand.',
          'Because seven of thirteen is a simple majority, the hand often turns on a single contested trick in the middle.',
          'Counting trumps as they fall matters enormously; knowing the last trump has gone turns your side suits into winners.',
          'Taking all thirteen tricks is the most emphatic result available and is worth playing for when your hand supports it.',
        ],
      },
    ],
  },
  {
    slug: 'mendikot',
    name: 'Mendikot',
    video: { youtubeId: 'odccK-10VCc' },
    alternateNames: ['Mindicot', 'Dehla Pakad (Delhi variant)'],
    tagline: 'Capture all four 10s — or stop your opponents from doing it.',
    icon: '🔟',
    players: '4 players (2 teams)', playerCount: '4',
    difficulty: 'Medium', comingSoon: true,
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
    playGuide: [
      {
        heading: 'Setting up the game',
        points: [
          'Mendikot is a four-player partnership game, with partners seated opposite one another.',
          'The full deck is dealt out, thirteen cards to each player, so nothing is left over.',
          'The dealer\'s last card is turned up and its suit becomes trump for the hand.',
          'Unusually, the goal is not tricks or points — it is the four tens.',
        ],
      },
      {
        heading: 'Playing tricks',
        points: [
          'The player left of the dealer leads, and following the led suit is compulsory whenever you can.',
          'If you are void you may play any card, including a trump.',
          'The highest trump wins the trick, or the highest card of the led suit if no trump is played.',
          'The trick winner leads the next one.',
        ],
      },
      {
        heading: 'Hunting the tens',
        points: [
          'Only the four tens decide the hand. Every other card matters purely as a means of capturing them.',
          'A partnership that captures three of the four tens wins the hand.',
          'Capture all four and it is a mendikot — the emphatic version of the same result.',
          'This changes trick play completely: a trick with no ten in it is worth nothing except the lead it gives you.',
        ],
      },
      {
        heading: 'Playing well',
        points: [
          'Protect your own tens. Leading a suit in which you hold the ten invites opponents to trump it away.',
          'Watch which tens have already fallen — once three are accounted for, the whole hand narrows to the fourth.',
          'Sacrificing a trick to draw out trumps is often worth it if it clears the way to a ten later.',
          'Partnership signalling through your choice of lead is the main way to tell your partner where your strength lies.',
        ],
      },
    ],
  },
  {
    slug: '29-game',
    name: '29 Game',
    video: { youtubeId: 'zGyRlvLsfkE' },
    alternateNames: ['Twenty-Nine', 'Atu-Katta (Kerala)'],
    tagline: 'Bid up to 29 — win the most points to fulfill your contract.',
    icon: '🌴',
    players: '4 players (2 teams)', playerCount: '4',
    difficulty: 'Hard', comingSoon: true,
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
    playGuide: [
      {
        heading: 'Setting up the game',
        points: [
          'The 29 Game is played by four people in two partnerships, using a 32-card deck of sevens through Aces.',
          'Each player ends up with eight cards, but only the first four are dealt before the auction opens.',
          'Card points are unusual: Jacks are worth 3, nines 2, and Aces and tens 1 each. Everything else is worth nothing.',
          'That comes to 28 points across the deck, which is what the bidding is measured against.',
        ],
      },
      {
        heading: 'The auction',
        points: [
          'With four cards each, players bid the number of card points their side expects to take.',
          'Bidding opens at 16 and can rise to 28, the entire pack. You may pass instead of bidding.',
          'The highest bidder wins the auction and names the trump suit for the hand.',
          'The remaining four cards are then dealt to everyone, so you bid on half a hand and play with a full one.',
        ],
      },
      {
        heading: 'Playing tricks',
        points: [
          'Trick-taking power runs Jack highest, then nine, Ace, ten, King, Queen, eight and seven.',
          'That order is the single most important thing to learn — the Jack and nine outrank the Ace and ten.',
          'You must follow the led suit if you can; otherwise any card may be played.',
          'The highest trump wins the trick, and with no trump the strongest card of the led suit takes it.',
        ],
      },
      {
        heading: 'Winning the hand',
        points: [
          'Once all eight tricks are played, the bidding side counts the card points it captured.',
          'Reach the bid and the side scores. Fall short and the defenders score instead.',
          'Holding the Jack and nine of one suit is a very strong reason to bid high and name that suit.',
          'As a defender, force out the bidding side\'s trumps early to strip their protection from the high-value cards.',
        ],
      },
    ],
  },
  {
    slug: 'sleep',
    name: 'Sleep',
    video: { youtubeId: 'bkDC3JoRjSk' },
    alternateNames: ['Spoons', 'Pig', 'Donkey'],
    tagline: 'Collect four of a kind, then call it — the last one awake loses.',
    icon: '😴',
    players: '2–6 players', playerCount: '2–6',
    difficulty: 'Easy', comingSoon: true,
    regions: ['Universal'],
    languages: [LANG.en, LANG.es, LANG.pt, LANG.fr, LANG.de, LANG.hi],
    description: 'Sleep is a fast, chaotic passing game with no winner — only a loser. Cards circulate around the table one at a time while everyone hunts for four of a kind. The moment somebody gets it and calls "Sleep!", every other player drops what they are doing and races to call it too. The last player still awake loses the round.',
    objective: 'Collect four cards of the same rank and call Sleep — or, once someone else has, call it before everyone but one.',
    setup: [
      'Use a standard 52-card deck. Sleep seats 2 to 6 players.',
      'Deal four cards to every player. Everyone looks at their own hand.',
      'The rest of the deck sits face-down as the stock, next to the first player in seat order.',
      'Only rank matters. Suits are irrelevant from start to finish.',
    ],
    gameplay: [
      'The lead seat draws the top card of the stock, bringing their hand to five.',
      'They then pass one card of the five to the next player, keeping four.',
      'Every other player does the same in turn: take the card passed to you, then pass one of your five on.',
      'Cards passed on by the final seat go to a trash pile, which is reshuffled back into the stock when it runs dry.',
      'Cards move continuously, so a rank you have been collecting can vanish as fast as it arrived.',
      'As soon as you hold four of a kind, call Sleep.',
    ],
    scoring: 'There is no score to accumulate — each round produces one loser, the last player left awake. Play as many rounds as you like and track who has been caught most often.',
    tips: [
      'Do not fixate on the rank you were dealt most of. Whatever flows through your hands fastest is usually the better target.',
      'Watch the table, not just your cards. The first Sleep is often called quietly, and missing it costs you the round.',
      'Passing your junk quickly keeps the circulation fast, which favours whoever is paying closest attention.',
    ],
    playGuide: [
      {
        heading: 'Setting up the round',
        points: [
          'Sleep seats 2 to 6 players and uses a single standard deck.',
          'Every player is dealt four cards, and the remainder becomes a face-down stock beside the lead seat.',
          'The lead seat is simply the first awake player in seat order — it is not an advantage so much as a job.',
          'Because only rank matters, four Kings of any suits is exactly as good as any other four of a kind.',
        ],
      },
      {
        heading: 'How cards circulate',
        points: [
          'Only the lead seat touches the stock. They draw the top card, which briefly gives them five cards.',
          'They then choose one of those five to pass to the next player, going back down to four.',
          'Everyone else receives a card from the player before them and passes one on in the same way, so every hand stays at four between turns.',
          'Whatever the last seat passes on goes to the trash pile rather than back round, and the trash is reshuffled into the stock when the stock empties.',
        ],
      },
      {
        heading: 'Calling Sleep',
        points: [
          'The first player to hold four cards of the same rank calls Sleep.',
          'That call opens the race. From that moment nobody else needs four of a kind — everyone still awake is simply trying to call Sleep before the others.',
          'So the biggest mistake in the game is watching your own cards so intently that you miss somebody else\'s call.',
          'Players who call successfully are safe, and the round continues among whoever is left.',
        ],
      },
      {
        heading: 'Losing the round',
        points: [
          'The last player still awake when everyone else has called is the loser of the round.',
          'There is no winner as such — everyone else simply escaped, which is the same shape as Old Maid or Indian Jackass.',
          'Rounds are short, so the game is normally played as a long series with the losses tallied.',
          'Passing fast is a genuine tactic: the quicker cards move, the more likely a distracted opponent misses the call.',
        ],
      },
    ],
  },
  {
    slug: 'indian-rummy',
    video: { youtubeId: 'M_9aW1ZGgS4' },
    seo: { title: 'How to Play Indian Rummy Online – Rules & Strategy | Vanikar', h1: 'How to Play Indian Rummy' },
    relatedGames: ['gin-rummy', 'canasta', 'buraco'],
    name: 'Indian Rummy',
    alternateNames: ['Paplu', '13-Card Rummy', 'Rummy (India)'],
    tagline: 'Form sequences and sets — a pure sequence is non-negotiable.',
    icon: '🃏',
    players: '2–6 players', playerCount: '2–6',
    difficulty: 'Medium',
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
    playGuide: [
      {
        heading: 'Setting up your table',
        points: [
          'Indian Rummy plays 2–6 using two full decks plus printed jokers (108 cards). Each player receives 13 cards.',
          'After the deal, one random card is revealed as the WILD JOKER — every card of that rank (in any suit) acts as a joker for the whole hand, alongside the printed jokers.',
          'One card is flipped to start the discard pile; the rest form the face-down draw pile.',
        ],
      },
      {
        heading: 'What you\'re building',
        points: [
          'Your goal is to arrange all 13 cards into sequences and sets: at minimum two sequences, one of which must be PURE.',
          'A PURE sequence is 3+ consecutive cards of the same suit with NO jokers (e.g., 5♥ 6♥ 7♥). Without one, your declaration is invalid no matter how good the rest is.',
          'An impure sequence uses a wild or printed joker to fill a gap. A set is 3–4 cards of the same rank in different suits (jokers allowed).',
          'Use the sort helper to group your hand by suit, then mark out which cards are heading into which meld.',
        ],
      },
      {
        heading: 'Each turn: draw, plan, discard',
        points: [
          'Draw one card — from the face-down pile (private) or the top of the discard pile (public, and everyone sees what you wanted).',
          'Re-arrange, then discard exactly one card face-up to end your turn.',
          'Discard high unattached cards (A, K, Q, J are 10 points each as deadwood) early, and never throw cards adjacent to what an opponent just picked up.',
        ],
      },
      {
        heading: 'Dropping and declaring',
        points: [
          'If your dealt hand is hopeless, you can FOLD (drop) for a fixed penalty — far cheaper than being caught with 60+ points of deadwood. A first-turn drop costs the least.',
          'To finish, complete your 14th-card turn by discarding face-down to declare, then show your arranged melds.',
          'A valid declaration (pure sequence + all cards melded) scores zero; opponents score their deadwood, up to the 80-point cap.',
          'A WRONG declaration is the worst result in the game: an automatic 80-point penalty while opponents drop to zero. Double-check before you declare.',
        ],
      },
    ],
    screenshots: [
      { file: 'indian-rummy/01-game-setup.png', title: 'Set up the table', caption: 'Two decks plus jokers, 13 cards each — 2 to 6 players.' },
      { file: 'indian-rummy/02-deal.png',       title: 'The deal',         caption: 'A random card becomes the wild joker for the hand, alongside the printed jokers.' },
      { file: 'indian-rummy/03-arrange.png',    title: 'Arrange your hand', caption: 'Sort by suit and build toward your pure sequence first — nothing counts without it.' },
      { file: 'indian-rummy/04-gameplay.png',   title: 'Draw and discard', caption: 'Take from the pile or the discard, then throw one card — the app tracks both piles.' },
      { file: 'indian-rummy/05-fold.png',       title: 'Fold when hopeless', caption: 'Drop early for a small fixed penalty instead of risking a big deadwood count.' },
    ],
  },
  {
    slug: 'indian-jackass',
    name: 'Indian Jackass',
    video: { youtubeId: 'QFsd7w8qiW8' },
    alternateNames: ['Jackass', 'Donkey', 'Kazhutha'],
    tagline: 'Shed every card — the last one holding loses.',
    icon: '🎴',
    players: '2–6 players', playerCount: '2–6',
    difficulty: 'Easy',
    regions: ['India'],
    languages: [LANG.hi, LANG.en, LANG.mr, LANG.gu],
    seo: {
      title: 'Indian Jackass Card Game – Rules, How to Play & Strategy | Vanikar',
      h1:    'How to Play Indian Jackass',
    },
    relatedGames: ['president', 'big-two', 'sevens', 'bluff'],
    description: 'Indian Jackass (also called Donkey, or other names for the same animal 😉) is a trick-based shedding game with no winner — only a loser. Follow suit while you can, dump your cards, and don\'t be the last player holding any. Each round\'s loser starts the next round with a penalty card, and rounds continue until the table decides to stop.',
    objective: 'Empty your hand. The last player still holding cards is the round\'s Jackass — the loser.',
    setup: [
      'Use a standard 52-card deck, no Jokers. 2–6 players.',
      'Shuffle, then deal one card at a time in round-robin order, up to 13 cards per player (with 4 players the whole deck is dealt).',
      'The player holding the Ace of Spades leads the first trick. In later rounds, the previous round\'s loser leads.',
    ],
    gameplay: [
      'The leader drops any card; its suit becomes the lead suit for the trick.',
      'You must follow the lead suit if you hold it. If you have none of that suit, you may drop any card.',
      'An off-suit drop ends the trick instantly — the whole pile goes into the hand of whoever dropped the highest lead-suit card, and they lead next.',
      'If every player follows suit, the trick\'s cards are removed from play and the highest card leads the next trick.',
      'Dropping off-suit while still holding the lead suit is an illegal move: the offender picks up the entire pile and must lead the next trick.',
      'Players who empty their hand are out of the round. When only one player still holds cards, they lose the round.',
    ],
    scoring: 'No winner — only a loser each round. The loser leads the next round and starts it with a penalty card: the Ace of Spades on a first loss, then A♣, A♦, A♥, K♠ and so on for consecutive losses. The app records the loser of every round.',
    tips: [
      'Shed your high cards early, while others still have to follow suit — late in a round they win piles you don\'t want.',
      'Count suits as they empty: a well-timed off-suit drop dumps the whole pile on the biggest lead-suit card.',
      'If you\'re carrying a penalty card, play it safe — a second straight loss stacks another one on top.',
    ],
    playGuide: [
      {
        heading: 'Setting up your table',
        points: [
          'Indian Jackass seats 2–6 players — at least one human, with up to 5 AI opponents at Easy, Medium, or Hard difficulty.',
          'Each round the dealer presses Deal: cards go out one at a time, round-robin, up to 13 per player. With 4 players the whole deck is dealt.',
          'The player holding the Ace of Spades leads the first trick (if it wasn\'t dealt, the app picks the next card in priority order: A♣, A♦, A♥, K♠, …). From round two on, the previous loser leads.',
        ],
      },
      {
        heading: 'Following suit and winning tricks',
        points: [
          'The leader drops any card and its suit becomes the lead suit. Everyone after must follow suit if they can.',
          'The moment someone with no lead-suit cards drops another suit, the trick ends — the whole pile goes into the hand of whoever played the highest lead-suit card, and they lead next.',
          'If every player follows suit, those cards leave the game for good — that\'s the only way cards are permanently removed — and the highest card leads the next trick.',
        ],
      },
      {
        heading: 'Illegal moves',
        points: [
          'Dropping off-suit while you still hold the lead suit is illegal. The app warns you before you confirm the play.',
          'The penalty is heavy: the offender takes every card in the pile into their hand and must lead the next trick.',
        ],
      },
      {
        heading: 'Losing the round and penalty cards',
        points: [
          'Play your last card and you\'re out — unless that card wins the trick, in which case the pile comes back to you and you\'re still in. The last player holding cards loses the round, even with just one card.',
          'The loser starts the next round with a penalty card guaranteed in their hand: Ace of Spades first, then A♣, A♦, A♥, K♠, K♣, … one more for each consecutive loss.',
          'Escape the streak and your extra penalty cards pass to the new loser, one per round, in the order you received them.',
          'Rounds continue until any player requests a stop; the session ends after the current round. Rearrange your hand any time — it never affects play.',
        ],
      },
      {
        heading: 'An example round',
        points: [
          'Four players — Asha, Bela, Chetan, Deep. Asha holds the A♠ and leads the 7♥; Bela follows with the 10♥ and Chetan with the Q♥. Deep has no hearts and drops the 5♣ — the trick ends instantly, and Chetan (highest heart) picks up all four cards and leads next.',
          'Later, Chetan leads the 9♠; everyone follows suit — 2♠, K♠, 4♠. All four cards leave the game for good, and the K♠ player leads the next trick.',
          'Endgame, two players left: Chetan holds two cards, Deep five. Chetan leads the 4♦ and Deep follows with the 8♦ — both followed suit, so the cards are removed and Deep leads. Deep leads the 3♣; Chetan has no clubs and drops his last card, the 9♥, off-suit — Deep\'s 3♣ is the only club, so Deep takes the pile back. Chetan is out of cards, Deep is the last player holding any: Deep is the round\'s Jackass.',
        ],
      },
      {
        heading: 'Common table variations',
        points: [
          'Player count changes the deal: with 4 players the full 52-card deck goes out evenly; with 2–3 players some cards sit out the round; with 5–6 players hands come out slightly smaller than 13.',
          'The penalty ladder is the signature Vanikar rule: consecutive losses stack A♠, A♣, A♦, A♥, K♠, K♣ … into the loser\'s next hand, and escaping a streak passes your penalty cards to the new loser one per round.',
          'Session length is up to the table — play a single round for a quick loser, or keep the rounds rolling and let the app\'s round-by-round loser log tell the story of the evening.',
        ],
      },
    ],
    extraFaqs: [
      { q: 'What is Indian Jackass?',
        a: 'Indian Jackass is a trick-based shedding card game played at Indian family card tables. There is no winner — players race to empty their hands, and the last player still holding cards is the round\'s "Jackass." It uses a standard 52-card deck and seats 2–6 players.' },
      { q: 'Is there a winner in Indian Jackass?',
        a: 'No — each round produces only a loser. Everyone else escapes by emptying their hand first. That structure makes it a lighthearted party game: the fun is in avoiding the title, not chasing a score.' },
      { q: 'What are the penalty cards in Indian Jackass?',
        a: 'The round\'s loser starts the next round with a penalty card guaranteed in their hand — the Ace of Spades on a first loss, then A♣, A♦, A♥, K♠ and so on for each consecutive loss. Lose repeatedly and the penalties stack up.' },
      { q: 'How does a round of Indian Jackass end?',
        a: 'Players drop out as they play their last card. When only one player still holds cards, the round ends immediately and that player loses — even if they are down to a single card.' },
    ],
    screenshots: [
      { file: 'indian-jackass/01-game-setup.png', title: 'Set up the table', caption: 'Two to six players — add AI opponents and pick their difficulty.' },
      { file: 'indian-jackass/02-deal.png',       title: 'The deal',         caption: 'Cards go out round-robin; the Ace of Spades holder leads the first trick.' },
      { file: 'indian-jackass/03-sort-helper.png', title: 'Sort view',       caption: 'Rearrange your hand freely — display order never affects play.' },
      { file: 'indian-jackass/04-gameplay.png',   title: 'Tricks in play',   caption: 'Follow the lead suit if you can — an off-suit drop sends the whole pile to the highest lead-suit card.' },
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
    video: { youtubeId: '9v5UxlUg55Y' },
    alternateNames: ['English Whist', 'Bid Whist'],
    tagline: 'The ancestor of Bridge — follow suit and win tricks.',
    icon: '🎩',
    players: '4 players (2 teams)', playerCount: '4',
    difficulty: 'Medium', comingSoon: true,
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
    playGuide: [
      {
        heading: 'Setting up the game',
        points: [
          'Whist is a four-player partnership game — you and the player opposite form one team against the other two.',
          'The whole deck is dealt out, thirteen cards to each player, so nothing is left over.',
          'The dealer\'s own last card is turned face-up for the table to see, and its suit becomes trump for the hand.',
          'That card then joins the dealer\'s hand, which means everyone starts the hand knowing one of the dealer\'s cards.',
        ],
      },
      {
        heading: 'Playing a trick',
        points: [
          'The player to the dealer\'s left leads the first trick, and any card may be led.',
          'You must follow the suit that was led if you hold it. Only when you are void may you play something else, including a trump.',
          'The highest trump played wins the trick; if no trump appears, the highest card of the led suit wins.',
          'The winner of each trick leads the next, so winning also hands you control of what suit comes next.',
        ],
      },
      {
        heading: 'Reading the hand',
        points: [
          'There is no bidding in Whist, which makes card-counting the entire skill of the game.',
          'Track which suits your opponents have shown void, because that tells you when their trumps will appear.',
          'Leading from your longest suit tends to exhaust opponents\' cards in it and turn your low cards into late winners.',
          'Your partner\'s choice of lead is the only signal you get, so pay close attention to what they open with.',
        ],
      },
      {
        heading: 'Scoring',
        points: [
          'The first six tricks a partnership takes are called the book and score nothing at all.',
          'Every trick beyond six scores one point, so a side taking nine tricks scores three.',
          'This is why a hand can be hard fought and still yield a very small score.',
          'Play a series of deals to an agreed target, with the trump suit changing each time the deal moves on.',
        ],
      },
    ],
  },
  {
    slug: 'durak',
    video: { youtubeId: '3JagmUmUJOc', start: 145 },
    seo: { title: 'How to Play Durak Online – Rules & Strategy | Vanikar', h1: 'How to Play Durak' },
    relatedGames: ['president', 'big-two', 'bluff', 'war'],
    name: 'Durak',
    alternateNames: ['Дурак', 'Fool'],
    tagline: 'Attack, defend, or be the Fool.',
    icon: '🃏',
    players: '2–6 players', playerCount: '2–6',
    difficulty: 'Medium',
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
    playGuide: [
      {
        heading: 'Setting up your table',
        points: [
          'Durak plays 2–6 with a 36-card deck (6s through Aces). Everyone gets 6 cards.',
          'The bottom card of the draw pile is flipped and tucked underneath, visible all game — its suit is TRUMP for the whole hand.',
          'The player holding the lowest trump attacks first; play then moves clockwise. There is no "winner" of a hand — only a loser, the Durak (Fool).',
        ],
      },
      {
        heading: 'Attacking',
        points: [
          'The attacker plays one card (or several of the same rank) face-up in front of the defender.',
          'Once the defence starts, anyone may "pile on" extra attacking cards — but ONLY of ranks already on the table this bout, and never more cards than the defender can answer (max 6).',
          'Attack with ranks the defender has already beaten this bout: they\'ve likely used up their answers for that rank.',
        ],
      },
      {
        heading: 'Defending',
        points: [
          'Beat each attacking card individually with a HIGHER card of the same suit, or with any trump. A higher trump beats a lower trump.',
          'Beat everything and the whole bout is discarded face-down — permanently out of the game — and you become the next attacker.',
          'Can\'t (or won\'t) beat a card? Take EVERYTHING on the table into your hand, and you lose your turn to attack — the attacker goes again against the next player.',
          'Taking isn\'t always terrible: scooping a few useful trumps early can set up a strong endgame.',
        ],
      },
      {
        heading: 'Refilling and the endgame',
        points: [
          'After each bout, every player draws back up to 6 cards — attacker first, other attackers next, defender last — until the draw pile (including the trump card) is exhausted.',
          'Once the pile is empty, the game turns razor-sharp: cards spent are gone forever, so count which trumps remain.',
          'Players who empty their hands drop out safely one by one. The last player left holding cards is the Durak and deals the next round — the app tracks wins across rounds.',
        ],
      },
    ],
    screenshots: [
      { file: 'durak/01-game-setup.png',  title: 'Set up the table', caption: 'Durak uses a 36-card deck, 6s through Aces — choose your opponents and deal.' },
      { file: 'durak/02-before-deal.png', title: 'Before the deal',  caption: 'The table is set; the trump card is about to be revealed under the draw pile.' },
      { file: 'durak/03-after-deal.png',  title: 'Six cards each',   caption: 'The flipped card under the draw pile fixes trump for the whole hand.' },
      { file: 'durak/04-attack.png',      title: 'The attack',       caption: 'Attackers may only add ranks already on the table this bout.' },
      { file: 'durak/05-defend.png',      title: 'The defence',      caption: 'Beat every card with a higher card of its suit or any trump — or take the lot.' },
      { file: 'durak/06-endgame.png',     title: 'The endgame',      caption: 'With the draw pile empty, shed everything — the last player holding cards is the Fool.' },
      { file: 'durak/07-result.png',      title: 'Round over',       caption: 'The summary names the Durak and tracks wins across rounds.' },
    ],
  },
  {
    slug: 'scopa',
    name: 'Scopa',
    video: { youtubeId: 'TuPZ3zsHmIo' },
    alternateNames: ['Sweep', 'Escoba (Spain/Latin America)'],
    tagline: 'Sweep the table — Italy\'s card game of cunning captures.',
    icon: '🍕',
    players: '2–4 players', playerCount: '2–4',
    difficulty: 'Medium', comingSoon: true,
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
    playGuide: [
      {
        heading: 'Setting up the game',
        points: [
          'Scopa seats 2 to 4 players and uses a 40-card Italian-style deck, with eights, nines and tens removed.',
          'Each player is dealt three cards and four are placed face-up on the table.',
          'Card values run from Ace as 1 through to the court cards at 8, 9 and 10.',
          'Hands are replenished three at a time as the deck is used up.',
        ],
      },
      {
        heading: 'Capturing',
        points: [
          'On your turn you play one card and use it to capture from the table.',
          'A card captures any single table card of the same value, and if such a match exists you must take it.',
          'Otherwise, a card captures any group of table cards whose values add up to it — a seven can take a five and a two together.',
          'If you cannot capture anything, your card simply joins the table for someone else to take.',
        ],
      },
      {
        heading: 'Scopa sweeps',
        points: [
          'Clearing every card from the table with a single capture is a scopa, and it scores an immediate point.',
          'Turn the capturing card face-up in your pile so the sweep can be counted at the end.',
          'The last player to capture in a round collects any cards still lying on the table, but that does not count as a scopa.',
          'Leaving awkward totals behind is the main defensive skill — a table an opponent cannot clear is a table that cannot be swept.',
        ],
      },
      {
        heading: 'Scoring',
        points: [
          'After each round, points go to whoever captured the most cards and to whoever captured the most coins or diamonds.',
          'The seven of coins, the sette bello, is worth a point on its own to whoever captured it.',
          'A further point goes for the primiera, the best combination of one card per suit, where sevens count highest.',
          'Add one point per scopa, and play rounds until someone passes eleven points.',
        ],
      },
    ],
  },
  {
    slug: 'belote',
    video: { youtubeId: 'xWzdW8JkDFA' },
    seo: { title: 'How to Play Belote Online – Rules & Strategy | Vanikar', h1: 'How to Play Belote' },
    relatedGames: ['skat', 'euchre', 'whist', 'spades'],
    name: 'Belote',
    alternateNames: ['Belot', 'Bleot', 'Baloot (Arabic)'],
    tagline: 'France\'s national card game — bid, trump, and Coinché.',
    icon: '🥖',
    players: '4 players (2 teams)', playerCount: '4',
    difficulty: 'Hard',
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
    playGuide: [
      {
        heading: 'Setting up your table',
        points: [
          'Belote is 4 players in two partnerships using a 32-card deck (7 through Ace). First team to 501 points wins the match.',
          'Eight cards are dealt to each player in a 3–2–3 pattern.',
          'Before bidding, burn these two rankings into memory — they\'re what makes Belote Belote: in TRUMP, J (20) > 9 (14) > A (11) > 10 (10) > K (4) > Q (3) > 8 > 7; in the other suits, A (11) > 10 (10) > K (4) > Q (3) > J (2) > 9 > 8 > 7.',
        ],
      },
      {
        heading: 'Bidding a contract',
        points: [
          'Starting left of the dealer, each player either bids — a point value (80 minimum, rising in steps of 10) plus a trump suit — or passes.',
          'Your bid is a promise: "my team will score at least this many of the 162 card points with this suit as trump."',
          'Holding the trump Jack is worth roughly a bid of 80 by itself; Jack + 9 of the same suit is a monster.',
          'Opponents confident you\'ll fail can call COINCHÉ (double the contract); your side can answer SURCOINCHÉ (quadruple). The highest bid sets the contract and play begins.',
        ],
      },
      {
        heading: 'Trick play',
        points: [
          'The player left of the dealer leads. You must follow the led suit if you can.',
          'Void in the led suit? You must TRUMP if you can. And if a trump is already winning the trick, you must OVERTRUMP if able — Belote\'s follow rules are strict, and the app enforces them.',
          'Exception: if your partner is currently winning the trick, you\'re free to discard instead of trumping.',
          'Highest trump wins the trick, or the highest card of the led suit if no trump appears. The winner leads next.',
        ],
      },
      {
        heading: 'Belote-Rebelote and scoring',
        points: [
          'Hold both the King AND Queen of trump? Announce "Belote" when you play the first and "Rebelote" on the second — a guaranteed 20-point bonus that even counts toward a failed contract.',
          'The last trick is worth 10 bonus points ("dix de der"), bringing each hand\'s total to 162.',
          'Contract made: both teams keep the points they captured (plus declarations). Contract failed: the bidding team scores 0 and the defenders take all 162 plus declarations.',
          'A coinché contract doubles the stakes, surcoinché quadruples. Hands repeat until a team passes 501.',
        ],
      },
    ],
    screenshots: [
      { file: 'belote/01-game-setup.png', title: 'Set up the table', caption: 'Four players, two teams, one 32-card deck — first to 501.' },
      { file: 'belote/02-deal.png',       title: 'The deal',         caption: 'Eight cards each, dealt 3–2–3.' },
      { file: 'belote/03-bid.png',        title: 'Bid a contract',   caption: 'Bid 80+ naming your trump suit, pass, or double the enemy with Coinché.' },
      { file: 'belote/04-gameplay.png',   title: 'Trick play',       caption: 'Trump J and 9 rule the table; declare Belote-Rebelote with the trump K and Q for +20.' },
    ],
  },
  {
    slug: 'skat',
    name: 'Skat',
    video: { youtubeId: 'RyiDypsr_cI' },
    alternateNames: ['German Skat'],
    tagline: 'Germany\'s greatest card game — bid, pick up the Skat, and declare.',
    icon: '🇩🇪',
    players: '3 players', playerCount: '3',
    difficulty: 'Hard', comingSoon: true,
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
    playGuide: [
      {
        heading: 'The deck and card values',
        points: [
          'Skat is played by three people with a 32-card deck, 7 through Ace. Ten cards go to each player and two are set aside face-down as the skat.',
          'Card values total 120 points across the deck: each Ace 11, each 10 is worth 10, King 4, Queen 3, Jack 2, and 9s through 7s nothing.',
          'Because 10s outrank Kings in value but not in trick-taking power in the plain suits, protecting your 10s is a constant concern.',
          'The four Jacks are always trump in suit and grand games, ranking Clubs, Spades, Hearts, Diamonds from highest to lowest.',
        ],
      },
      {
        heading: 'The bidding',
        points: [
          'One player becomes the declarer and plays alone against the other two, who defend as a temporary partnership.',
          'Bidding is a sequence of numbers, each the value of a game someone is willing to play. You are not bidding tricks — you are bidding how much your intended contract is worth.',
          'A game value is a base value for the suit multiplied by factors from your Jack holding, so counting your Jacks before bidding is essential.',
          'The last player still bidding wins the auction and becomes the declarer.',
        ],
      },
      {
        heading: 'Choosing your game',
        points: [
          'Suit game: you name a trump suit, and the four Jacks plus that suit form the trump. You need 61 of the 120 card points to win.',
          'Grand: only the four Jacks are trump, making the plain suits far more dangerous. It carries the highest base value.',
          'Null: an inverted contract where you must lose every trick. There is no trump and card points are irrelevant — a single trick loses it.',
          'You may pick up the two skat cards and discard two of your own, or play a hand game without touching them for extra value.',
        ],
      },
      {
        heading: 'Playing and scoring',
        points: [
          'The player left of the dealer leads. Following suit is compulsory when you can; otherwise any card is legal.',
          'Remember that Jacks belong to the trump suit, not their printed one. Leading a Club does not oblige anyone to play the Jack of Clubs.',
          'Beyond 61 points there are bonuses: holding your opponents under 30 is schneider, and taking every trick is schwarz.',
          'Win and you add the game value to your score; lose and you subtract double. That asymmetry is why overbidding is the most expensive mistake in Skat.',
        ],
      },
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
/** Games in development — shown in catalog but not yet playable */
export const comingSoonGames  = games.filter(g =>  g.comingSoon);

export function getGame(slug: string): Game | undefined {
  return games.find(g => g.slug === slug);
}

export function getGamesByRegion(region: Region): Game[] {
  return games.filter(g => g.regions.includes(region));
}
