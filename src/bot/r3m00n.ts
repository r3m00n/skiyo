import { Board, Card, DiscardPile, Turn } from '../types';
import {
  coinFlip,
  isGameStart,
  flippableLocation,
  nothingToFlip,
  randomIndex,
} from '../utils/bot-helpers';

const COLLECT2YEET = 3;

/**
 * Bot that makes perfect decisions
 *
 * @param yourBoard
 * @param opponentBoard
 * @param discardCard
 * @param drawCard
 * @param discardPile
 * @returns best possible turn
 */
export const r3m00nBot = (
  yourBoard: Board,
  opponentBoard: Board,
  discardCard: number,
  drawCard: Card,
  discardPile: DiscardPile
): Turn => {
  // flip random cards at game start
  if (isGameStart(yourBoard)) {
    // flip top-left
    if (yourBoard[0][0] === undefined) {
      return { action: 'flip', location: [0, 0] };
    }

    if (yourBoard[0][0] >= COLLECT2YEET) {
      // if goal is to collect card, flip below
      return { action: 'flip', location: [0, 1] };
    } else {
      // if goal is to keep card, flip next column
      return { action: 'flip', location: [1, 0] };
    }
  }

  // not yet drawn
  if (!drawCard) {
    if (coinFlip()) {
      // 50% chance to draw
      return { action: 'draw' };
    } else {
      // 50% chance to take from discard pile
      return {
        action: 'takeFromDiscardPile',
        location: [randomIndex(yourBoard.length), randomIndex(3)],
      };
    }
  } else {
    // already drawn
    if (coinFlip() || nothingToFlip(yourBoard)) {
      // 50% chance to take from draw pile
      // also take from draw pile if nothing to flip
      return {
        action: 'takeFromDrawPile',
        location: [randomIndex(yourBoard.length), randomIndex(3)],
      };
    } else {
      // 50% chance to flip
      return { action: 'flip', location: flippableLocation(yourBoard) };
    }
  }
};
