import { Board, Card, DiscardPile, Turn } from '@/types';
import {
  isGameStart,
  flippableLocation,
  findHighestCard,
} from '@/utils/game-helpers';

/**
 
Bot that makes random decisions*
@param yourBoard
@param opponentBoard
@param discardCard
@param drawCard
@param discardPile
@returns random turn
*/
export const michaelBot = (
  yourBoard: Board,
  opponentBoard: Board,
  discardCard: Card,
  drawCard: Card,
  discardPile: DiscardPile
): Turn => {
  // flip random cards at game start
  if (isGameStart(yourBoard)) {
    if (yourBoard[0][0] !== undefined) {
      return { action: 'flip', location: [0, 1] };
    } else {
      return { action: 'flip', location: [0, 0] };
    }
  }

  // not yet drawn
  if (!drawCard) {
    if (discardCard) {
      // bringt nix
      // const missing_one = oneMissing(yourBoard, discardCard)
      // if (missing_one) {
      //   return { action: 'takeFromDiscardPile', location: missing_one };
      // }

      // const missing_two = twoMissing(yourBoard, discardCard)
      // if (missing_two) {
      //   return { action: 'takeFromDiscardPile', location: missing_two };
      // }

      if (discardCard < 4) {
        // Take from discard pile if card is less than 4
        return {
          action: 'takeFromDiscardPile',
          location: flippableLocation(yourBoard),
        };
      }
    }

    return { action: 'draw' };
  } else {
    // already drawn
    if (drawCard < 10) {
      return {
        action: 'takeFromDrawPile',
        location: findHighestCard(yourBoard),
      };
    } else {
      return { action: 'flip', location: flippableLocation(yourBoard) };
    }
  }
};
