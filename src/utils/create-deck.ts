import { Deck } from '@/types';

/**
 * Creates a deck of cards.
 * The deck consists of 5 cards with value -2, 10 cards each from -1 to 12, and 5 extra cards with value 0.
 *
 * @returns {Deck} The created deck of cards.
 */
export const createDeck = (): Deck => {
  const deck: Deck = [];

  // Add 5 cards with value -2
  for (let i = 0; i < 5; i++) {
    deck.push(-2);
  }

  // Add 10 cards each from -1 to 12
  for (let i = -1; i <= 12; i++) {
    for (let j = 0; j < 10; j++) {
      deck.push(i);
    }
  }

  // Add 5 extra cards with value 0
  for (let i = 0; i < 5; i++) {
    deck.push(0);
  }

  return deck;
};
