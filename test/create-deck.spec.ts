import { createDeck } from '@/src/utils/system-helpers';

describe('createDeck', () => {
  const deck = createDeck();

  it('should create a deck of cards with the correct number of cards', () => {
    expect(deck.length).toBe(150);
  });

  it('should have 5 cards with value -2', () => {
    const count = deck.filter((card) => card === -2).length;
    expect(count).toBe(5);
  });

  it('should have 10 cards with value -1', () => {
    const count = deck.filter((card) => card === -1).length;
    expect(count).toBe(10);
  });

  it('should have 15 cards with value 0', () => {
    const count = deck.filter((card) => card === 0).length;
    expect(count).toBe(15);
  });

  it('should have 10 cards each from 1 to 12', () => {
    for (let i = 1; i <= 12; i++) {
      const count = deck.filter((card) => card === i).length;
      expect(count).toBe(10);
    }
  });
});
