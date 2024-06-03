import { Board, Column, SystemBoard } from '../types';

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
        if (card.isShown) {
          return card.value;
        }
        return undefined;
      }) as Column;
    });
  } else {
    newBoard = board as Board;
  }

  console.log(newBoard);
};

/**
 * Displays both boards.
 *
 * @param boardP1 - The board of player 1.
 * @param boardP2 - The board of player 2.
 */
export const showBothBoards = (
  boardP1: Board | SystemBoard,
  boardP2: Board | SystemBoard
): void => {
  console.log('Player 1: ');
  showBoard(boardP1);
  console.log('Player 2: ');
  showBoard(boardP2);
};

/**
 * Displays a board.
 *
 * @param board - The board to display.
 */
export const showSystemBoard = (board: SystemBoard): void => {
  console.log(board);
};

/**
 * Displays both system boards.
 *
 * @param boardP1 - The system board of player 1.
 * @param boardP2 - The system board of player 2.
 */
export const showBothSystemBoards = (
  boardP1: SystemBoard,
  boardP2: SystemBoard
): void => {
  console.log('Player 1: ');
  console.log(boardP1);
  console.log('Player 2: ');
  console.log(boardP2);
};
