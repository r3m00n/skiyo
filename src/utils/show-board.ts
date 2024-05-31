import { Board, Column, SystemBoard } from '@/types';

/**
 * Displays the board.
 *
 * @param board - The board to be displayed.
 */
export const showBoard = (board: Board | SystemBoard): void => {
  let newBoard: Board = [];

  if (typeof board[0][0] == 'object') {
    newBoard = (board as SystemBoard).map((column) => {
      return column.map((card) => {
        return card.value;
      }) as Column;
    });
  } else {
    newBoard = board as Board;
  }

  console.log(newBoard);
};
