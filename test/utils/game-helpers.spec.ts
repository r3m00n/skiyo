import {
  createDeck,
  shuffleDeck,
  dealCards,
  visibleScore,
  convertToBoard,
  isGameStart,
  allTurned,
  score,
  clearColumns,
} from '../../src/utils/game-helpers';
import { Card, SystemBoard } from '../../src/types';

describe('Utility Functions', () => {
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

  describe('visibleScore', () => {
    it('calculates the visible score of the board', () => {
      const board: SystemBoard = [
        [
          { value: 1, isShown: true },
          { value: 2, isShown: true },
          { value: 3, isShown: false },
        ],
        [
          { value: 4, isShown: true },
          { value: 5, isShown: false },
          { value: 6, isShown: false },
        ],
        [
          { value: 7, isShown: true },
          { value: 8, isShown: true },
          { value: 9, isShown: false },
        ],
        [
          { value: 10, isShown: true },
          { value: 11, isShown: false },
          { value: 12, isShown: false },
        ],
      ];
      expect(visibleScore(board)).toBe(32); // Sum of 1+2+4+7+8+10
    });
  });

  describe('convertToBoard', () => {
    it('converts a SystemBoard to a Board', () => {
      const systemBoard: SystemBoard = [
        [
          { value: 1, isShown: true },
          { value: 2, isShown: false },
          { value: 3, isShown: true },
        ],
        [
          { value: 4, isShown: false },
          { value: 5, isShown: true },
          { value: 6, isShown: false },
        ],
      ];
      const board = convertToBoard(systemBoard);
      expect(board).toEqual([
        [1, undefined, 3],
        [undefined, 5, undefined],
      ]);
    });
  });

  describe('isGameStart', () => {
    it('returns true if it is game start', () => {
      const board: SystemBoard = [
        [
          { value: 1, isShown: false },
          { value: 2, isShown: true },
          { value: 3, isShown: false },
        ],
        [
          { value: 4, isShown: false },
          { value: 5, isShown: false },
          { value: 6, isShown: false },
        ],
      ];
      expect(isGameStart(board)).toBe(true);
    });

    it('returns false if more than one card is flipped', () => {
      const board: SystemBoard = [
        [
          { value: 1, isShown: true },
          { value: 2, isShown: true },
          { value: 3, isShown: false },
        ],
        [
          { value: 4, isShown: false },
          { value: 5, isShown: false },
          { value: 6, isShown: false },
        ],
      ];
      expect(isGameStart(board)).toBe(false);
    });
  });

  describe('allTurned', () => {
    it('returns true if all cards are turned', () => {
      const board: SystemBoard = [
        [
          { value: 1, isShown: true },
          { value: 2, isShown: true },
          { value: 3, isShown: true },
        ],
        [
          { value: 4, isShown: true },
          { value: 5, isShown: true },
          { value: 6, isShown: true },
        ],
      ];
      expect(allTurned(board)).toBe(true);
    });

    it('returns false if not all cards are turned', () => {
      const board: SystemBoard = [
        [
          { value: 1, isShown: true },
          { value: 2, isShown: false },
          { value: 3, isShown: true },
        ],
        [
          { value: 4, isShown: true },
          { value: 5, isShown: false },
          { value: 6, isShown: true },
        ],
      ];
      expect(allTurned(board)).toBe(false);
    });
  });

  describe('score', () => {
    it('calculates the total score of the board', () => {
      const board: SystemBoard = [
        [
          { value: 1, isShown: true },
          { value: 2, isShown: false },
          { value: 3, isShown: true },
        ],
        [
          { value: 4, isShown: false },
          { value: 5, isShown: true },
          { value: 6, isShown: false },
        ],
      ];
      expect(score(board)).toBe(21); // Sum of 1+2+3+4+5+6
    });
  });

  describe('clearColumns', () => {
    it('clears columns where all cards are shown and have the same value', () => {
      const board: SystemBoard = [
        [
          { value: 1, isShown: true },
          { value: 1, isShown: true },
          { value: 1, isShown: true },
        ],
        [
          { value: 2, isShown: true },
          { value: 2, isShown: true },
          { value: 3, isShown: true },
        ],
        [
          { value: 4, isShown: false },
          { value: 4, isShown: true },
          { value: 4, isShown: true },
        ],
      ];
      const updatedBoard = clearColumns(board);
      expect(updatedBoard).toEqual([
        [
          { value: 2, isShown: true },
          { value: 2, isShown: true },
          { value: 3, isShown: true },
        ],
        [
          { value: 4, isShown: false },
          { value: 4, isShown: true },
          { value: 4, isShown: true },
        ],
      ]);
    });
  });
});
