import { Board, Card, DiscardPile, Turn } from '@/types';
import { isGameStart, flippableLocation } from '@/utils/game-helpers';

const NOICE = 4;

/**
 * Bot that makes random decisions
 *
 * @param yourBoard
 * @param opponentBoard
 * @param discardCard
 * @param drawCard
 * @param discardPile
 * @returns random turn
 */
export const rushBot = (
  yourBoard: Board,
  opponentBoard: Board,
  discardCard: number,
  drawCard: Card,
  discardPile: DiscardPile
): Turn => {
  // flip random cards at game start
  if (isGameStart(yourBoard)) {
    return { action: 'flip', location: flippableLocation(yourBoard) };
  }

  // if not drawn
  if (drawCard === undefined) {
    // if discard card is NOICE, take from discard pile
    if (discardCard <= NOICE) {
      return {
        action: 'takeFromDiscardPile',
        location: flippableLocation(yourBoard),
      };
    } else {
      // if not drawn, draw
      return {
        action: 'draw',
      };
    }
  } else {
    if ((drawCard as number) <= NOICE) {
      return {
        action: 'takeFromDrawPile',
        location: flippableLocation(yourBoard),
      };
    }
  }
  // noth cards not NOICE
  return { action: 'flip', location: flippableLocation(yourBoard) };
};
