import { Board, Deck, DiscardPile } from '../types';

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

/**
 * Finds the location in a column where the third position should be cleared
 * if the column contains exactly two occurrences of the specified card and
 * the remaining position is undefined.
 *
 * @param board - A two-dimensional array representing the board, which contains
 *                columns with up to three numbers or undefined values.
 * @param card - The card number to check for in the columns.
 * @returns A tuple containing the column index and the row index of the undefined
 *          position if the criteria are met, or null if no such position exists.
 */
export const findLocationToClearColumn = (
  board: Board,
  card: number
): [number, number] | null => {
  for (let colIdx = 0; colIdx < board.length; colIdx++) {
    const column = board[colIdx];
    let count = 0;
    let emptyIndex: number | null = null;

    for (let rowIdx = 0; rowIdx < column.length; rowIdx++) {
      if (column[rowIdx] === card) {
        count++;
      } else if (column[rowIdx] === undefined) {
        emptyIndex = rowIdx;
      }
    }

    if (count === 2 && emptyIndex !== null) {
      return [colIdx, emptyIndex];
    }
  }

  return null;
};

/**
 * Returns number of turned Cards
 *
 * @param board
 * @returns number of undefined Cards
 */
export const getHiddenCards = (board: Board): number => {
  let hiddenCardsCount = 0;

  for (const column of board) {
    for (const card of column) {
      if (card === undefined) {
        hiddenCardsCount++;
      }
    }
  }

  return hiddenCardsCount;
};

/**
 * Calculates the number of remaining cards of a specified value that are not shown
 * on either board or in the discard pile.
 *
 * @param card - The value of the card to check remaining count for.
 * @param board1 - The first player's board, represented as an array of columns.
 * @param board2 - The second player's board, represented as an array of columns.
 * @param discardPile - The discard pile, represented as an array of card values.
 * @returns The number of remaining cards of the specified value.
 *
 * @throws Will throw an error if the card value is invalid.
 */
export const getRemaining = (
  card: number,
  board1: Board,
  board2: Board,
  discardPile: DiscardPile
): number => {
  // Helper function to count occurrences of a card in a board
  const countCardInBoard = (board: Board, card: number): number => {
    return board.flat().filter((c) => c === card).length;
  };

  // Count occurrences in both boards and discard pile
  const countInBoard1 = countCardInBoard(board1, card);
  const countInBoard2 = countCardInBoard(board2, card);
  const countInDiscardPile = discardPile.filter((c) => c === card).length;

  // Total count of the card in the game
  let totalCards: number;
  if (card === -2) {
    totalCards = 5;
  } else if (card === 0) {
    totalCards = 15;
  } else if (card === -1 || (card >= 1 && card <= 12)) {
    totalCards = 10;
  } else {
    throw new Error('Invalid card value');
  }

  // Calculate remaining cards
  const remainingCards =
    totalCards - (countInBoard1 + countInBoard2 + countInDiscardPile);

  return remainingCards;
};

/**
 * Calculates the number of cards remaining in the draw pile.
 *
 * @param board1 - The first player's board, represented as an array of columns.
 * @param board2 - The second player's board, represented as an array of columns.
 * @param pile - The discard pile, represented as an array of card values.
 * @returns The number of cards remaining in the draw pile.
 *
 * @remarks
 * The total number of cards in the game is 150. This function calculates the
 * remaining cards in the draw pile by subtracting the number of cards in the
 * discard pile and the number of cards on both boards from the total.
 */
export const getCardsInDrawPile = (
  board1: Board,
  board2: Board,
  pile: DiscardPile
): number => {
  // Helper function to count the number of cards on a board
  const countCardsOnBoard = (board: Board): number => {
    return board.flat().filter((c) => c !== undefined).length;
  };

  // Count cards on both boards
  const cardsOnBoard1 = countCardsOnBoard(board1);
  const cardsOnBoard2 = countCardsOnBoard(board2);

  // Calculate total number of cards in the draw pile
  const totalCards = 150;
  const cardsInDrawPile =
    totalCards - pile.length - cardsOnBoard1 - cardsOnBoard2;

  return cardsInDrawPile;
};
