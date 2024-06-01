import {
  Board,
  Card,
  Column,
  Deck,
  DiscardPile,
  SystemBoard,
  Turn,
} from '@/types';
import { createDeck } from '../utils/create-deck';
import { shuffleDeck } from '../utils/shuffle-deck';
import { dealCards } from '../utils/deal-cards';
import {
  showBoard,
  showBothBoards,
  showBothSystemBoards,
  showSystemBoard,
} from '../utils/show-board';
import { convertToBoard } from '../utils/convert-to-board';
import { clearColumns } from '../utils/clear-columns';
import { currentScore } from '../utils/current-score';
import { randomBot } from '../bots/random';
import { turnAllCards } from '../utils/turn-all-cards';
import { isGameStart, nothingToFlip } from '../utils/game-helpers';
import { gptBot } from '../bots/chatgpt';

export const simulateGame = (DEBUG = false): number => {
  // Define Variables
  let deck: Deck = [];
  let discardPile: DiscardPile = [];
  let drawCard: Card = undefined;
  let boardP1: SystemBoard = [];
  let boardP2: SystemBoard = [];

  // Create new Deck
  deck = createDeck();

  // Shuffle the deck
  deck = shuffleDeck(deck);

  // Deal Cards
  ({ deck: deck, board: boardP1 } = dealCards(deck));
  ({ deck: deck, board: boardP2 } = dealCards(deck));
  // TODO: write test to see if deck now has correct length (it does)

  // push one card to discard pile
  discardPile.push(deck.pop() as number);

  let player1Turn = currentScore(boardP1) > currentScore(boardP2);
  let gameRunning = true;
  let turnCount = 0;

  while (gameRunning) {
    if (!isGameStart(convertToBoard(boardP1))) {
      turnCount++;
    }

    // get bot's turn
    const { action, location } = gptBot(
      convertToBoard(boardP1),
      convertToBoard(boardP2),
      discardPile[discardPile.length - 1],
      drawCard,
      discardPile
    );

    if (DEBUG) {
      console.log(
        `Turn ${turnCount} - action: ${action} ${location !== undefined ? '- location ' + location : ''}`
      );
      console.log(
        `Score: ${currentScore(boardP1)} - DiscardCard: ${discardPile[discardPile.length - 1]} - DrawCard: ${drawCard}`
      );
      showBoard(convertToBoard(boardP1));
      console.log('after');
    }

    // Check if flipped at game start
    if (isGameStart(convertToBoard(boardP1)) && action !== 'flip') {
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

        boardP1[location[0]][location[1]].value = drawCard as number;
        boardP1[location[0]][location[1]].isShown = true;

        drawCard = undefined;
        break;

      case 'takeFromDiscardPile':
        if (!location) {
          throw new Error('Location is required to takeFromDiscardPile');
        }

        boardP1[location[0]][location[1]].value = discardPile.pop() as number;
        boardP1[location[0]][location[1]].isShown = true;
        break;

      case 'flip':
        if (!location) {
          throw new Error('Location is required to flip');
        }

        if (boardP1[location[0]][location[1]].isShown) {
          throw new Error('Card is already shown');
        }

        boardP1[location[0]][location[1]].isShown = true;
        break;

      default:
        throw new Error('Invalid action');
    }

    DEBUG && showBoard(convertToBoard(boardP1));

    // clear columns
    clearColumns(boardP1);

    // check if game is over
    if (nothingToFlip(convertToBoard(boardP1))) {
      gameRunning = false;
      break;
    }

    // put draw card on discard pile if not used
    if (drawCard !== undefined && action !== 'draw') {
      discardPile.push(drawCard);
      drawCard = undefined;
    } else if (!isGameStart(convertToBoard(boardP1))) {
      // put deck card on discard pile
      discardPile.push(deck.pop() as number);
    }
  }
  return currentScore(boardP1);
};
