import { SystemBoard } from '@/types';

/**
 * Clears Columns that are shown and have the same value.
 *
 * @param board The System Board to clear columns from.
 * @returns The updated System Board.
 */
export const clearColumns = (board: SystemBoard): SystemBoard => {
  const newBoard: SystemBoard = [];

  for (let i = 0; i < board.length; i++) {
    const column = board[i];
    const columnValues = column.map((card) => card.value);
    const isColumnShown = column.every((card) => card.isShown);
    const isColumnSameValue = columnValues.every(
      (value) => value === columnValues[0]
    );

    if (!(isColumnShown && isColumnSameValue)) {
      newBoard.push(column);
    }
  }

  return newBoard;
};
