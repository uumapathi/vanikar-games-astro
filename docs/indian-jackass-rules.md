# Indian Jackass — Game Rules

> Source: `CardGame.Engines/src/CardGame.IndianJackass` engine. Verified 2026-08-13.

## Overview

Indian Jackass is a trick-based shedding game with no winner — only a loser. Get rid of every
card in your hand; the last player still holding cards loses the round and carries a penalty
card into the next one. Rounds repeat indefinitely until the players decide to stop.

**Objective:** Be the first to empty your hand. The last player holding cards is the round's
Jackass (loser).

## Setup

- One standard 52-card deck, no Jokers.
- 2–6 players. At least one human; up to 5 AI opponents (Easy, Medium, or Hard).
- The deck is shuffled, then dealt one card at a time in round-robin order, up to 13 cards per
  player. With 4 players the whole deck is dealt evenly; with fewer players the extra cards sit
  out the round; with 5–6 players hands are slightly smaller than 13.
- **First round:** the player holding the Ace of Spades leads the first trick. If the Ace of
  Spades wasn't dealt, the holder of the next card in the priority order — A♠ A♣ A♦ A♥ K♠ K♣ K♦
  K♥ Q♠ … — leads instead.
- **Later rounds:** the previous round's loser leads. (If a round ends on an all-same-suit
  trick, the winner of that trick leads instead.)
- Each new round waits for the dealer to press **Deal** before hands are distributed.

## Playing a trick

1. The leader drops any card. Its suit becomes the **lead suit** for the trick.
2. Each following player in turn must drop a card:
   - If you hold one or more cards of the lead suit, you **must** follow suit.
   - If you hold no cards of the lead suit, you may drop any card.
3. **Off-suit ends the trick immediately.** The moment any player drops a card of a different
   suit, the trick stops. Every card in the pile goes into the hand of the player who dropped
   the **highest card of the lead suit**, and that player leads the next trick.
4. **Everyone follows suit:** if every active player drops a card of the lead suit, the trick's
   cards are **removed from play entirely** — this is the only way cards permanently leave a
   round. The player who dropped the highest lead-suit card leads the next trick.

## Illegal moves

Dropping an off-suit card **while still holding the lead suit** is an illegal move. The
penalty: the offender takes **every card in the pile** into their own hand and must lead the
next trick. The round then continues as normal. (The app warns a human player before letting
them confirm an illegal drop.)

## Ending a round

- A player who plays their last card is out of the round; play continues among the rest.
  Exception: if your last card wins the trick, the pile comes back into your hand and you stay
  in.
- The round ends when only one player still holds cards. That player is the **loser** — even
  with a single card left.
- There is no winner. Only the loser is recorded, and the app keeps a round-by-round history.

## Penalty ("default") cards

- The loser leads the next round and starts it with a **default card**: the Ace of Spades on a
  first loss.
- **Consecutive losses** earn the next card in this fixed sequence, one per loss:
  A♠ A♣ A♦ A♥ K♠ K♣ K♦ K♥ Q♠ Q♣ Q♦ Q♥ J♠ … continuing down the ranks in the same suit order.
  If the next card in the sequence is currently another player's default card, it is skipped
  and the following card is assigned instead.
- Default cards are guaranteed to be in that player's next hand: they are set aside before the
  shuffle and placed at the front of the hand, with the rest of the deck shuffled and dealt
  round-robin as usual.
- **Passing defaults on:** if a player holding more than one default card does *not* lose the
  next round, they pass their oldest default card to the new loser — one card per round, in the
  order they were received (first in, first out). Their consecutive-loss streak also resets.

## Table etiquette & app features

- Any player, human or AI, can rearrange the cards in their hand at any time — display order
  only; it never affects the game.
- The game continues round after round until any player requests a stop; the session then ends
  after the current round completes.
