import { SystemBoard, SystemColumn } from '@/types';

/**
 * Set all cards in the board to be shown
 * @param board The board to turn all cards
 * @returns The board with all cards shown
 */
export const turnAllCards = (board: SystemBoard): SystemBoard => {
  return board.map(
    (column) =>
      column.map((card) => ({ ...card, isShown: true })) as SystemColumn
  );
};
