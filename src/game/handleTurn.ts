import { SystemBoard } from '@/types';
import { clearColumns } from '../utils/clear-columns';
import { convertToBoard } from '../utils/convert-to-board';
import { isGameStart, nothingToFlip } from '../utils/game-helpers';

export const handleTurn = (
  action: string,
  location: [number, number] | undefined,
  board: SystemBoard,
  discardPile: number[],
  drawCard: number | undefined,
  deck: number[],
  turnCount: number,
  player1Turn: boolean
) => {
  if (isGameStart(convertToBoard(board)) && action !== 'flip') {
    throw new Error('Flip action is required at game start');
  }

  // handle action
  switch (action) {
    case 'draw':
      if (drawCard) {
        throw new Error('Draw card already exists');
      }

      drawCard = deck.pop();
      turnCount--;
      break;

    case 'takeFromDrawPile':
      if (!location) {
        throw new Error('Location is required to takeFromDrawPile');
      }

      if (drawCard == undefined) {
        throw new Error('Draw card is required to takeFromDrawPile');
      }

      board[location[0]][location[1]].value = drawCard as number;
      board[location[0]][location[1]].isShown = true;

      drawCard = undefined;
      break;

    case 'takeFromDiscardPile':
      if (!location) {
        throw new Error('Location is required to takeFromDiscardPile');
      }

      board[location[0]][location[1]].value = discardPile.pop() as number;
      board[location[0]][location[1]].isShown = true;
      break;

    case 'flip':
      if (!location) {
        throw new Error('Location is required to flip');
      }

      if (board[location[0]][location[1]].isShown) {
        throw new Error('Card is already shown');
      }

      board[location[0]][location[1]].isShown = true;
      break;

    default:
      throw new Error('Invalid action');
  }

  // clear columns
  board = clearColumns(board);

  if (action !== 'draw') {
    // switch turn if action is not draw
    player1Turn = !player1Turn;
    // put draw card on discard pile if not used
    if (drawCard !== undefined) {
      discardPile.push(drawCard);
      drawCard = undefined;
    }
  } else if (!isGameStart(convertToBoard(board))) {
    // put deck card on discard pile
    discardPile.push(deck.pop() as number);
  }

  return {
    board,
    discardPile,
    drawCard,
    deck,
    turnCount,
    gameRunning: nothingToFlip(convertToBoard(board)),
    player1Turn,
  };
};
