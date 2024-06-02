import { Card, Deck, SystemBoard, Turn } from '@/types';
import { validateTurn } from './validate-turn';

export const handleTurn = (
  turn: Turn,
  board: SystemBoard,
  deck: Deck,
  discardPile: Deck,
  drawCard: Card,
  isPlayer1Turn: boolean
): {
  board: SystemBoard;
  deck: Deck;
  discardPile: Deck;
  drawCard: Card;
  isPlayer1Turn: boolean;
} => {
  validateTurn(turn, board, drawCard);

  const { action, location } = turn;

  switch (action) {
    case 'takeFromDiscardPile':
      board[location![0]][location![1]].value = discardPile.pop() as number;
      board[location![0]][location![1]].isShown = true;
      break;

    case 'draw':
      drawCard = deck.pop() as number;
      // TODO: handle empty deck
      break;

    case 'takeFromDrawPile':
      board[location![0]][location![1]].value = drawCard as number;
      board[location![0]][location![1]].isShown = true;
      drawCard = undefined;
      // TODO: put card from board on discard pile
      break;

    case 'flip':
      board[location![0]][location![1]].isShown = true;
      break;
  }

  if (action !== 'draw') {
    isPlayer1Turn = !isPlayer1Turn;
  }

  return { board, deck, discardPile, drawCard, isPlayer1Turn };
};
