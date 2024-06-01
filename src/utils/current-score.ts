import { Board, SystemBoard } from '@/types';

/**
 * Calculates the current score of a board.
 *
 * @param board The board to calculate the score from.
 * @returns The current score of the board.
 */
export const currentScore = (board: Board | SystemBoard): number => {
  let score = 0;

  if (typeof board[0][0] == 'object') {
    (board as SystemBoard).forEach((column) => {
      column.forEach((card) => {
        if (card.isShown) {
          score += card.value;
        }
      });
    });
  } else {
    (board as Board).forEach((column) => {
      column.forEach((card) => {
        if (card !== undefined) score += card;
      });
    });
  }

  return score;
};
