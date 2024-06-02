import { Board, SystemBoard } from '@/types';

/**
 * Returns a random boolean.
 *
 * @returns A random boolean.
 */
export const coinFlip = () => Math.random() > 0.5;

/**
 * Returns a random index for a given length.
 *
 * @param length - The length of the array.
 * @returns A random index.
 */
export const randomIndex = (length: number) =>
  Math.floor(Math.random() * length);

/**
 * Checks if there is a card to flip on the game board.
 * @param board The game board to check.
 * @returns Returns true if there is nothing to flip, false otherwise.
 */
export const nothingToFlip = (board: Board) =>
  // TODO: make it work for system board
  board.every((column) => column.every((card) => card !== undefined));

/**
 * Returns a flippable location on the board.
 *
 * @param board - The game board.
 * @returns An array containing the column and row indices of the flippable location.
 */
export const flippableLocation = (board: Board): [number, number] => {
  while (true) {
    const column = randomIndex(board.length);
    const card = randomIndex(3);
    if (board[column][card] === undefined) {
      return [column, card];
    }
  }
};

/**
 * Returns true if bot has to flip one of it's initial two cards.
 *
 * @param board - The game board.
 * @returns boolean
 */
export const isGameStart = (board: Board): boolean => {
  let undefinedCount = 0;

  for (const column of board) {
    for (const card of column) {
      if (card !== undefined) {
        undefinedCount++;
        if (undefinedCount > 1) {
          return false;
        }
      }
    }
  }

  return true;
};

/**
 * Returns the location of the highest card on the board.
 *
 * @param board - The game board.
 * @returns The location of the highest card on the board.
 */
export const findHighestCard = (board: Board): [number, number] => {
  let highestCard = 0;
  let highestCardLocation: [number, number] = [0, 0];

  board.forEach((column, columnIndex) => {
    column.forEach((card, cardIndex) => {
      if (card !== undefined && card > highestCard) {
        highestCard = card;
        highestCardLocation = [columnIndex, cardIndex];
      }
    });
  });

  return highestCardLocation;
};

/**
 * Returns the locaion of the highest card that's higher than the given value.
 *
 * @param board Your Board
 * @param value Number to compare
 * @returns
 */
export const findHigherThan = (
  board: Board,
  value: number
): [number, number] | null => {
  const location = findHighestCard(board);
  if (board[location[0]][location[1]]! > value) {
    return location;
  }
  return null;
};

/**
 * Calculates the current score of a board.
 *
 * @param board The board to calculate the score from.
 * @returns The current score.
 */
export const currentScore = (board: Board): number => {
  let score = 0;

  board.forEach((column) => {
    column.forEach((card) => {
      if (card !== undefined) score += card;
    });
  });

  return score;
};
