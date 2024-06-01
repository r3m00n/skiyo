import { Board, Card, Deck, DiscardPile, SystemBoard, Turn } from '@/types';
import { createDeck } from '../utils/create-deck';
import { shuffleDeck } from '../utils/shuffle-deck';
import { dealCards } from '../utils/deal-cards';
import { convertToBoard } from '../utils/convert-to-board';
import { currentScore } from '../utils/current-score';
import { turnAllCards } from '../utils/turn-all-cards';
import { isGameStart, nothingToFlip } from '../utils/game-helpers';
import { handleTurn } from './handleTurn';

interface SimulateGameProps {
  bot1: (
    yourBoard: Board,
    opponentBoard: Board,
    discardCard: Card,
    drawCard: Card,
    discardPile: DiscardPile
  ) => Turn;
  bot2: (
    yourBoard: Board,
    opponentBoard: Board,
    discardCard: Card,
    drawCard: Card,
    discardPile: DiscardPile
  ) => Turn;
}

// export const simulateGame = ({ bot1, bot2 }: SimulateGameProps) => {
export const simulateGame = (
  bot1: (
    yourBoard: Board,
    opponentBoard: Board,
    discardCard: Card,
    drawCard: Card,
    discardPile: DiscardPile
  ) => Turn,
  bot2: (
    yourBoard: Board,
    opponentBoard: Board,
    discardCard: Card,
    drawCard: Card,
    discardPile: DiscardPile
  ) => Turn
) => {
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
  ({ deck, board: boardP1 } = dealCards(deck));
  ({ deck, board: boardP2 } = dealCards(deck));
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

    if (player1Turn) {
      const { action, location } = bot1(
        convertToBoard(boardP1),
        convertToBoard(boardP2),
        discardPile[discardPile.length - 1],
        drawCard,
        discardPile
      );

      ({
        board: boardP1,
        discardPile,
        drawCard,
        deck,
        turnCount,
        gameRunning,
        player1Turn,
      } = handleTurn(
        action,
        location,
        boardP1,
        discardPile,
        drawCard,
        deck,
        turnCount,
        player1Turn
      ));

      // check if game is over
      if (nothingToFlip(convertToBoard(boardP1))) {
        gameRunning = false;
        break;
      }
    } else {
      const { action, location } = bot2(
        convertToBoard(boardP2),
        convertToBoard(boardP1),
        discardPile[discardPile.length - 1],
        drawCard,
        discardPile
      );

      ({
        board: boardP2,
        discardPile,
        drawCard,
        deck,
        turnCount,
        gameRunning,
        player1Turn,
      } = handleTurn(
        action,
        location,
        boardP2,
        discardPile,
        drawCard,
        deck,
        turnCount,
        player1Turn
      ));

      // check if game is over
      if (nothingToFlip(convertToBoard(boardP2))) {
        gameRunning = false;
        break;
      }
    }
  }

  // TODO: handle empty draw pile
  turnAllCards(boardP1);
  turnAllCards(boardP2);

  const scoreP1 = currentScore(boardP1);
  const scoreP2 = currentScore(boardP2);
  console.log('Player 1:', scoreP1);
  return { player1won: scoreP1 > scoreP2, scoreP1, scoreP2 };
};
