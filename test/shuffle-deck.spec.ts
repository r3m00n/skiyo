import { shuffleDeck } from '../src/utils/system-helpers';
import { createDeck } from '../src/utils/system-helpers';

describe('shuffleDeck', () => {
  it('should shuffle the deck of cards', () => {
    const deck = createDeck();
    const shuffledDeck = shuffleDeck(deck);

    // Assert that the shuffled Deck is not the same as the original Deck
    expect(shuffledDeck).not.toEqual(deck);

    // Assert that the shuffled Deck has the same Length as the original Deck
    expect(shuffledDeck.length).toEqual(deck.length);

    // Assert that the shuffled Deck contains the same Elements as the original Deck
    expect(shuffledDeck.sort()).toEqual(deck.sort());
  });
});
