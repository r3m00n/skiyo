import { Board, Card, DiscardPile, Turn } from '@/types';
import {
  isGameStart,
  flippableLocation,
  findHighestCard,
} from '@/utils/game-helpers';
import { currentScore } from '@/utils/current-score';

const NOICE = 2;

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
export const pickyBot = (
  yourBoard: Board,
  opponentBoard: Board,
  discardCard: Card,
  drawCard: Card,
  discardPile: DiscardPile
): Turn => {
  // flip random cards at game start
  if (isGameStart(yourBoard)) {
    return { action: 'flip', location: flippableLocation(yourBoard) };
  }
  const highCardLoc = findHighestCard(yourBoard);
  const highCardVal = yourBoard[highCardLoc[0]][highCardLoc[1]];

  // if not drawn
  if (drawCard === undefined) {
    // if discard card is NOICE, take from discard pile
    if ((discardCard as number) < NOICE) {
      // if highest card is higher than discard card, exchange
      if (highCardVal! > discardCard!) {
        return {
          action: 'takeFromDiscardPile',
          location: highCardLoc,
        };
      } else {
        // discard card is higher than highest card & NOICE
        return {
          action: 'takeFromDiscardPile',
          location: flippableLocation(yourBoard),
        };
      }
    } else {
      // if not drawn, draw
      return {
        action: 'draw',
      };
    }
  } else {
    // already drawn
    if ((drawCard as number) < NOICE) {
      if (highCardVal! > discardCard!) {
        return {
          action: 'takeFromDrawPile',
          location: highCardLoc,
        };
      } else {
        // discard card is lower than highest card & NOICE
        return {
          action: 'takeFromDrawPile',
          location: flippableLocation(yourBoard),
        };
      }
    } else {
      if (currentScore(yourBoard) <= NOICE) {
        return { action: 'takeFromDrawPile', location: highCardLoc };
      } else {
        return {
          action: 'takeFromDrawPile',
          location: flippableLocation(yourBoard),
        };
      }
    }
  }
};
