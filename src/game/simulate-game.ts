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
} from '../utils/system-helpers';
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

      if (isP1LastMove && turn.action !== 'draw') {
        isGameRunning = false;
      }

      if (allTurned(board1)) {
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

      if (isP2LastMove && turn.action !== 'draw') {
        isGameRunning = false;
      }

      if (allTurned(board2)) {
        // check ob anderer schon finished
        // wenn nicht sagen dass er finished ist
        // wenn verliert punkte verdoppeln
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
    points1: score(board1),
    points2: score(board2),
    turns,
  };

  return {
    points1:
      isP1LastMove && score(board1) < score(board2)
        ? score(board1)
        : score(board1) * 2,
    points2:
      isP2LastMove && score(board2) < score(board1)
        ? score(board2)
        : score(board2) * 2,
    turns,
  };
};
