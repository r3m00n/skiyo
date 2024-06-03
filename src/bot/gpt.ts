import { Board, Card, DiscardPile, Turn } from '../types';
import { isGameStart, flippableLocation } from '../utils/bot-helpers';

const findFaceDownCard = (board: Board): [number, number] | undefined => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === undefined) {
        return [i, j];
      }
    }
  }
  return undefined;
};

export const gptBot = (
  yourBoard: Board,
  opponentBoard: Board,
  discardCard: Card,
  drawCard: Card,
  discardPile: DiscardPile
): Turn => {
  // Helper function to evaluate if a card is low
  const isLowCard = (card: Card): boolean => card !== undefined && card <= 3;

  // Helper function to find the highest card on the board
  const findHighestCardLocation = (board: Board): [number, number] => {
    let maxCard: Card = -Infinity;
    let location: [number, number] = [0, 0];
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] !== undefined && board[i][j]! > maxCard!) {
          maxCard = board[i][j];
          location = [i, j];
        }
      }
    }
    return location;
  };

  // Flip cards at game start
  if (isGameStart(yourBoard)) {
    return { action: 'flip', location: flippableLocation(yourBoard) };
  }

  // Decide to draw or take from discard pile
  if (!drawCard) {
    if (isLowCard(discardCard)) {
      const faceDownLocation = findFaceDownCard(yourBoard);
      if (faceDownLocation) {
        return { action: 'takeFromDiscardPile', location: faceDownLocation };
      }
    } else {
      return { action: 'draw' };
    }
  }

  // Handle after drawing a card
  if (drawCard !== undefined) {
    const highestCardLocation = findHighestCardLocation(yourBoard);
    const [highCol, highRow] = highestCardLocation;
    const highestCard = yourBoard[highCol][highRow];

    if (highestCard === undefined || drawCard < highestCard) {
      return { action: 'takeFromDrawPile', location: highestCardLocation };
    }

    const faceDownLocation = findFaceDownCard(yourBoard);
    if (faceDownLocation) {
      return { action: 'flip', location: faceDownLocation };
    }
  }

  // If no good moves, flip a card
  const faceDownLocation = findFaceDownCard(yourBoard);
  if (faceDownLocation) {
    return { action: 'flip', location: faceDownLocation };
  }

  // If all cards are face up, take from the draw pile and replace the highest card
  const highestCardLocation = findHighestCardLocation(yourBoard);
  return { action: 'takeFromDrawPile', location: highestCardLocation };
};
