import { Bot, Card, Deck, Result } from '../types';
import { handleTurn } from './handle-turn';
import {
  allTurned,
  convertToBoard,
  createDeck,
  dealCards,
  isGameStart,
  score,
  visibleScore,
  clearColumns,
} from '../utils/game-helpers';
import { showBothBoards } from './show-board';

export const singleGame = (bot1: Bot, bot2: Bot): Result => {
  let { deck, board1, board2 } = dealCards(createDeck());
  let discardPile: Deck = [];
  discardPile.push(deck.pop() as number);
  let drawCard: Card = undefined;
  let isPlayer1Turn = true;
  let isGameRunning = true;
  let isStartPhase = true;
  let isP1LastMove = false;
  let isP2LastMove = false;
  let turns = 0;

  while (isGameRunning) {
    turns++;
    if (!isP2LastMove && (isPlayer1Turn || isStartPhase || isP1LastMove)) {
      const turn = bot1(
        convertToBoard(board1),
        convertToBoard(board2),
        discardPile[discardPile.length - 1],
        drawCard,
        discardPile
      );

      ({
        board: board1,
        deck,
        discardPile,
        drawCard,
        isPlayer1Turn,
      } = handleTurn(turn, board1, deck, discardPile, drawCard, isPlayer1Turn));

      ({ board: board1, discardPile } = clearColumns(board1, discardPile));

      if (isP1LastMove && turn.action !== 'draw') {
        isGameRunning = false;
      }

      // when all turned and other player didn't already fisnish
      if (allTurned(board1) && !isP1LastMove) {
        isP2LastMove = true;
      }
    }

    if (!isP1LastMove && (!isPlayer1Turn || isStartPhase || isP2LastMove)) {
      const turn = bot2(
        convertToBoard(board2),
        convertToBoard(board1),
        discardPile[discardPile.length - 1],
        drawCard,
        discardPile
      );

      ({
        board: board2,
        deck,
        discardPile,
        drawCard,
        isPlayer1Turn,
      } = handleTurn(turn, board2, deck, discardPile, drawCard, isPlayer1Turn));

      ({ board: board2, discardPile } = clearColumns(board2, discardPile));

      if (isP2LastMove && turn.action !== 'draw') {
        isGameRunning = false;
      }

      // when all turned and other player didn't already fisnish
      if (allTurned(board2) && !isP2LastMove) {
        isP1LastMove = true;
      }
    }

    // End of Starting Phase
    if (isStartPhase && !(isGameStart(board1) && isGameStart(board2))) {
      isStartPhase = false;
      isPlayer1Turn = visibleScore(board1) > visibleScore(board2);
    }

    // DEBUG:
    // showBothBoards(board1, board2);
    // isGameRunning = turns < 40;
  }

  return {
    points1:
      isP2LastMove && score(board2) < score(board1)
        ? score(board1) * 2
        : score(board1),
    points2:
      isP1LastMove && score(board1) < score(board2)
        ? score(board2) * 2
        : score(board2),
    turns,
    columns1: board1.length,
    columns2: board2.length,
  };
};
