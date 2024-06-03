import { Board, Card, DiscardPile, Turn } from '../types';
import { isGameStart, flippableLocation } from '../utils/bot-helpers';

/**
 * Bot that never finishes
 */
export const debugBot = (
  yourBoard: Board,
  opponentBoard: Board,
  discardCard: number,
  drawCard: Card,
  discardPile: DiscardPile
): Turn => {
  // flip random cards at game start
  if (isGameStart(yourBoard)) {
    return {
      action: 'flip',
      location: flippableLocation(yourBoard),
    };
  }

  return {
    action: 'takeFromDiscardPile',
    location: [0, 0],
  };
};
