import { Board, Card, DiscardPile, Turn } from '../types';
import {
  isGameStart,
  flippableLocation,
  findHighestCard,
} from '../utils/bot-helpers';
import { currentScore } from '../utils/bot-helpers';

/* Insane Rerults even tho a little
   unrealistic in real life ^^ */
// const NOICE = -1;
// const EXPECTED_SCORE = -10;

/* Best stats for competetive */
const NOICE = 3;
const EXPECTED_SCORE = 18;

export const pickyBot = (
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
  const highCardLoc = findHighestCard(yourBoard);
  const highCardVal = yourBoard[highCardLoc[0]][highCardLoc[1]];

  // if not drawn
  if (drawCard === undefined) {
    // if discard card is NOICE, take from discard pile
    if (discardCard <= NOICE) {
      // if highest card is higher than discard card, exchange
      if (highCardVal! > NOICE) {
        return {
          action: 'takeFromDiscardPile',
          location: highCardLoc,
        };
      } else {
        // discard card & visible cards are NOICE
        return {
          action: 'takeFromDiscardPile',
          location: flippableLocation(yourBoard),
        };
      }
    } else {
      // if discard card is not NOICE, draw
      return {
        action: 'draw',
      };
    }
  } else {
    // already drawn
    if (drawCard <= NOICE) {
      // draw card is NOICE & highest card is not NOICE
      if (highCardVal! > NOICE) {
        return {
          action: 'takeFromDrawPile',
          location: highCardLoc,
        };
      } else {
        // draw card and all visible cards are NOICE
        return {
          action: 'takeFromDrawPile',
          location: flippableLocation(yourBoard),
        };
      }
    } else {
      // draw card is not NOICE
      if (currentScore(yourBoard) + drawCard > EXPECTED_SCORE) {
        // if score after exchanging draw card is greater then EXPECTED_SCORE
        return { action: 'takeFromDrawPile', location: highCardLoc };
      } else {
        // if score after exchanging draw card is less than or equal to EXPECTED_SCORE
        return {
          action: 'takeFromDrawPile',
          location: flippableLocation(yourBoard),
        };
      }
    }
  }
};
