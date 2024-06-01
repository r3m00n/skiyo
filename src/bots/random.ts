import { Board, Card, DiscardPile, Turn } from '@/types';
import {
  coinFlip,
  isGameStart,
  flippableLocation,
  nothingToFlip,
  randomIndex,
} from '../utils/game-helpers';

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
export const randomBot = (
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
