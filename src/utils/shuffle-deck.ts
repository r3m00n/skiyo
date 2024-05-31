import { Deck } from '@/types';

/**
 * Shuffles the given deck of cards.
 *
 * @param {Deck} deck - The deck of cards to shuffle.
 * @returns {Deck} The shuffled deck of cards.
 */
export const shuffleDeck = (deck: Deck): Deck => {
  const shuffledDeck = [...deck];

  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
  }

  return shuffledDeck;
};
