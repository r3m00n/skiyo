import { Card, Deck, SystemBoard, Turn } from '../types';
import { validateTurn } from './validate-turn';
import { shuffleDeck } from '../utils/system-helpers';

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
      const cardForDiscardPile = board[location![0]][location![1]].value;
      board[location![0]][location![1]].value = discardPile.pop() as number;
      board[location![0]][location![1]].isShown = true;
      discardPile.push(cardForDiscardPile);
      break;

    case 'draw':
      drawCard = deck.pop() as number;
      // handle empty deck
      if (deck.length === 0) {
        const topCard = discardPile[discardPile.length - 1];
        deck = shuffleDeck(discardPile.slice(0, discardPile.length - 2));
        discardPile = [topCard];
      }
      break;

    case 'takeFromDrawPile':
      const tmp2 = board[location![0]][location![1]].value;
      board[location![0]][location![1]].value = drawCard as number;
      board[location![0]][location![1]].isShown = true;
      discardPile.push(tmp2);
      drawCard = undefined;
      // REFACTOR: make drawn card tmp
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
