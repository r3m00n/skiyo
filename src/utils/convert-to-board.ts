import { Board, Column, SystemBoard } from '@/types';

export const convertToBoard = (board: SystemBoard): Board => {
  const newBoard = (board as SystemBoard).map((column) => {
    return column.map((card) => {
      return card.isShown ? card.value : undefined;
    }) as Column;
  });

  return newBoard;
};
