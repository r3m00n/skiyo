import { Card, SystemBoard, Turn } from '../types';
import { isGameStart as checkGameStart } from '../utils/system-helpers';

export const validateTurn = (
  turn: Turn,
  board: SystemBoard,
  drawCard: Card
): void => {
  const { action, location } = turn;
  validateAction(action);
  validateLocation(location);

  const isGameStart = checkGameStart(board);

  // game start
  if (isGameStart && action !== 'flip')
    throw new Error('Has to flip a card on the first two turns.');

  switch (action) {
    case 'flip':
      if (!location) throw new Error('Location is required for flip action');

      if (board[location[0]][location[1]].isShown)
        throw new Error('Cannot flip a card that is already shown');

      if (!isGameStart && !drawCard)
        throw new Error('Cannot flip a card when draw card is not present');
      break;

    case 'draw':
      if (drawCard) throw new Error('Draw card already exists');
      break;
  }
};

export const validateAction = (action: string) => {
  if (
    action !== 'takeFromDiscardPile' &&
    action !== 'draw' &&
    action !== 'takeFromDrawPile' &&
    action !== 'flip'
  )
    throw new Error('Invalid Action');
};

export const validateLocation = (location: number[] | undefined) => {
  if (!location) return;
  if (
    location.length !== 2 ||
    location[0] < 0 ||
    location[1] < 0 ||
    location[0] > 3 ||
    location[1] > 2 ||
    location.some((l) => l % 1 !== 0)
  )
    throw new Error('Invalid Location');
};
