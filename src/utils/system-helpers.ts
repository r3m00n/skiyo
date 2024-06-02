import {
  Board,
  Column,
  Deck,
  SystemBoard,
  SystemCard,
  SystemColumn,
} from '@/types';

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

  return shuffleDeck(deck);
};

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

/**
 * Deals Cards from the Deck for one Player and creates a System Board.
 *
 * @param deck The Deck of Cards to deal from.
 * @returns An Object containing the updated Deck and the System Board.
 */
export const dealCards = (
  deck: Deck
): { deck: Deck; board1: SystemBoard; board2: SystemBoard } => {
  const board1: SystemBoard = [];
  const board2: SystemBoard = [];

  const dealBoard = (board: SystemBoard): SystemBoard => {
    for (let i = 0; i < 4; i++) {
      const column = [];

      for (let j = 0; j < 3; j++) {
        const card: SystemCard = { value: deck.pop()!, isShown: false };
        column.push(card);
      }

      board.push(column as SystemColumn);
    }
    return board;
  };

  dealBoard(board1);
  dealBoard(board2);

  return { deck, board1, board2 };
};

/**
 * Calculates the current score of a board.
 *
 * @param board The board to calculate the score from.
 * @returns The current visible score of the board.
 */
export const visibleScore = (board: SystemBoard): number => {
  let score = 0;

  board.forEach((column) => {
    column.forEach((card) => {
      if (card.isShown) {
        score += card.value;
      }
    });
  });

  return score;
};

/**
 * Converts a System Board to a Board.
 *
 * @param board board to convert
 * @returns board in Board format
 */
export const convertToBoard = (board: SystemBoard): Board => {
  const newBoard = (board as SystemBoard).map((column) => {
    return column.map((card) => {
      return card.isShown ? card.value : undefined;
    }) as Column;
  });

  return newBoard;
};

/**
 * Returns true if bot has to flip one of it's initial two cards.
 *
 * @param board - The game board.
 * @returns true if the game has just started and the bot has to flip a card.
 */
export const isGameStart = (board: SystemBoard): boolean => {
  let turnedCount = 0;

  for (const column of board) {
    for (const card of column) {
      if (card.isShown) {
        turnedCount++;

        if (turnedCount > 1) {
          return false;
        }
      }
    }
  }

  return true;
};

/**
 * Returns true if there is nothing to flip.
 *
 * @param board - The game board.
 * @returns true if there is nothing to flip.
 */
export const allTurned = (board: SystemBoard): boolean => {
  for (const column of board) {
    for (const card of column) {
      if (!card.isShown) {
        return false;
      }
    }
  }

  return true;
};

/**
 * Calculates total score of board.
 *
 * @param board The board to count.
 * @returns The score.
 */
export const score = (board: SystemBoard): number => {
  let score = 0;

  for (const column of board) {
    for (const card of column) {
      score += card.value;
    }
  }

  return score;
};
