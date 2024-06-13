import { Board, Card, DiscardPile, Turn } from '../types';
import {
  isGameStart,
  flippableLocation, // only give column as argument 🤯
  randomIndex,
  findLocationToClearColumn,
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

  handleGameStart(yourBoard);

  // not yet drawn
  if (!drawCard) {
    // if card is bad
    if (discardCard >= COLLECT2YEET) {
    } else {
      // if discard card is good
      // guck ob man spalte wegmachen kann und wie viele Punkte dadurch gutgemacht werden würden
      // suche aufbewahrspalte & place wenn dadurch keine Minuskarten weggehen
    }

    return { action: 'draw' };
  } else {
  }

  return {
    action: 'takeFromDrawPile',
    location: [randomIndex(yourBoard.length), randomIndex(3)],
  };
};

const handleGameStart = (board: Board): Turn | void => {
  if (isGameStart(board)) {
    if (board[0][0] === undefined) {
      // flip top-left first
      return { action: 'flip', location: [0, 0] };
    }

    if (board[0][0] >= COLLECT2YEET) {
      // if goal is to collect card, flip below
      return { action: 'flip', location: [0, 1] };
    } else {
      // if goal is to keep card, flip next column
      return { action: 'flip', location: [1, 0] };
    }
  }
};

export const clearColumnIfPossible = (
  board: Board,
  card: number
): Turn | void => {
  const location = findLocationToClearColumn(board, card);
  if (location) console.log(location);
  if (location) return { action: 'takeFromDiscardPile', location };
};
