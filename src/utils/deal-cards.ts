import { Deck, SystemBoard, SystemCard, SystemColumn } from '@/types';

/**
 * Deals Cards from the Deck for one Player and creates a System Board.
 *
 * @param deck The Deck of Cards to deal from.
 * @returns An Object containing the updated Deck and the System Board.
 */
export const dealCards = (deck: Deck): { deck: Deck; board: SystemBoard } => {
  const board: SystemBoard = [];

  for (let i = 0; i < 2; i++) {
    // for (let i = 0; i < 4; i++) {
    const column = [];

    for (let j = 0; j < 3; j++) {
      const card: SystemCard = { value: deck.pop()!, isShown: false };
      column.push(card);
    }

    board.push(column as SystemColumn);
  }

  return { deck, board };
};
