import {
  coinFlip,
  randomIndex,
  nothingToFlip,
  flippableLocation,
  isGameStart,
  findHighestCard,
  findHigherThan,
  currentScore,
} from '../../src/utils/bot-helpers';
import { Board } from '../../src/types';

describe('Utility Functions', () => {
  describe('coinFlip', () => {
    it('returns a boolean', () => {
      const result = coinFlip();
      expect(typeof result).toBe('boolean');
    });
  });

  describe('randomIndex', () => {
    it('returns a valid index within the array length', () => {
      const length = 5;
      for (let i = 0; i < 100; i++) {
        const index = randomIndex(length);
        expect(index).toBeGreaterThanOrEqual(0);
        expect(index).toBeLessThan(length);
      }
    });
  });

  describe('nothingToFlip', () => {
    it('returns true if there are no cards to flip', () => {
      const board: Board = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ];
      expect(nothingToFlip(board)).toBe(true);
    });

    it('returns false if there are cards to flip', () => {
      const board: Board = [
        [1, 2, undefined],
        [4, 5, 6],
        [7, undefined, 9],
      ];
      expect(nothingToFlip(board)).toBe(false);
    });
  });

  describe('flippableLocation', () => {
    it('returns a valid flippable location', () => {
      const board: Board = [
        [1, 2, undefined],
        [4, 5, 6],
        [7, undefined, 9],
      ];
      const location = flippableLocation(board);
      expect(board[location[0]][location[1]]).toBe(undefined);
    });
  });

  it('returns false if more than one card is flipped', () => {
    const board: Board = [
      [1, 2, 3],
      [4, 5, 6],
      [7, undefined, 9],
    ];
    expect(isGameStart(board)).toBe(false);
  });
});

describe('findHighestCard', () => {
  it('returns the location of the highest card', () => {
    const board: Board = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const location = findHighestCard(board);
    expect(location).toEqual([2, 2]);
  });
});

describe('findHigherThan', () => {
  it('returns the location of the highest card that is higher than the given value', () => {
    const board: Board = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const location = findHigherThan(board, 5);
    expect(location).toEqual([2, 2]);
  });

  it('returns null if no card is higher than the given value', () => {
    const board: Board = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const location = findHigherThan(board, 10);
    expect(location).toBeNull();
  });
});

describe('currentScore', () => {
  it('calculates the current score of the board', () => {
    const board: Board = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    expect(currentScore(board)).toBe(45);
  });

  it('ignores undefined cards in the score calculation', () => {
    const board: Board = [
      [1, 2, undefined],
      [4, 5, 6],
      [7, undefined, 9],
    ];
    expect(currentScore(board)).toBe(34);
  });
});

describe('coinFlip', () => {
  it('should return a random boolean', () => {
    const result = coinFlip();
    expect(typeof result).toBe('boolean');
  });

  it('should not always be true', () => {
    const results = Array.from({ length: 1000 }, () => coinFlip());
    const trueCount = results.filter((result) => result).length;
    const falseCount = results.filter((result) => !result).length;
    expect(trueCount).toBeGreaterThan(300);
    expect(falseCount).toBeGreaterThan(300);
  });
});

describe('randomIndex', () => {
  it('should return a random index within the given length', () => {
    const length = 3;
    const result = randomIndex(length);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThan(length);
  });
});

describe('nothingToFlip', () => {
  it('should return true if there is nothing to flip on the board', () => {
    const board: Board = [
      [3, 4, 12],
      [0, 10, 1],
    ];

    const result = nothingToFlip(board);
    expect(result).toBe(true);
  });

  it('should return false if there is something to flip on the board', () => {
    const board: Board = [
      [1, undefined, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const result = nothingToFlip(board);
    expect(result).toBe(false);
  });
});

describe('flippableLocation', () => {
  it('should return a flippable location on the board', () => {
    const board: Board = [
      [1, undefined, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const result = flippableLocation(board);
    expect(result[0]).toBeGreaterThanOrEqual(0);
    expect(result[0]).toBeLessThan(board.length);
    expect(result[1]).toBeGreaterThanOrEqual(0);
    expect(result[1]).toBeLessThan(3);
    expect(board[result[0]][result[1]]).toBeUndefined();
  });
});

describe('findHighestCard', () => {
  it('should return the location of the highest card on the board', () => {
    const board: Board = [
      [1, undefined, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const result = findHighestCard(board);
    expect(result).toEqual([2, 2]);
  });

  it('should return the first highest card location if there are multiple highest cards', () => {
    const board: Board = [
      [1, undefined, 3],
      [4, 5, 6],
      [7, 8, 9],
      [undefined, undefined, 9],
    ];
    const result = findHighestCard(board);
    expect(result).toEqual([2, 2]);
  });

  it('should return [0, 0] if the board is empty', () => {
    const board: Board = [
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
    ];
    const result = findHighestCard(board);
    expect(result).toEqual([0, 0]);
  });
});

describe('findHigherThan', () => {
  it('should return the location of a card higher than the given value', () => {
    const board: Board = [
      [1, undefined, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const value = 5;
    const result = findHigherThan(board, value);
    expect(result).toEqual([2, 2]);
  });

  it('should return null if there is no card higher than the given value', () => {
    const board: Board = [
      [1, undefined, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const value = 10;
    const result = findHigherThan(board, value);
    expect(result).toBeNull();
  });
});
