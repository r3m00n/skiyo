import { Bot, Card, Deck, DiscardPile, Result, SystemBoard } from '@/types';
import { createDeck } from '@/utils/create-deck';
import { shuffleDeck } from '@/utils/shuffle-deck';
import { dealCards } from '@/utils/deal-cards';
import { showBoard } from '@/utils/show-board';
import { convertToBoard } from '@/utils/convert-to-board';
import { clearColumns } from '@/utils/clear-columns';
import { currentScore } from '@/utils/current-score';
import { isGameStart, nothingToFlip } from '@/utils/game-helpers';
import { randomBot } from '@/bots/random';
import { gptBot } from '@/bots/gpt';
import { rushBot } from '@/bots/rush';

export const simulateGame = (bot1: Bot, bot2: Bot, runs: number): Result[] => {
  let results: Result[] = [];
  for (let i = 0; i < runs; i++) {
    // Define Variables
    let deck: Deck = [];
    let discardPile: DiscardPile = [];
    let drawCard: Card = undefined;
    let boardP1: SystemBoard = [];
    let boardP2: SystemBoard = [];
    const DEBUG = false;

    // Create new Deck
    deck = createDeck();

    // Shuffle the d
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
      if (player1Turn) {
        // get bot's turn
        const { action, location } = bot1(
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

            boardP1[location[0]][location[1]].value =
              discardPile.pop() as number;
            boardP1[location[0]][location[1]].isShown = true;
            break;

          case 'flip':
            if (!location) {
              throw new Error('Location is required to flip');
            }

            if (boardP1[location[0]][location[1]].isShown) {
              throw new Error('Card is already shown');
            }

            if (
              !isGameStart(convertToBoard(boardP1)) &&
              drawCard == undefined
            ) {
              throw new Error('You must draw a card before flipping');
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

        if (action !== 'draw') {
          player1Turn = !player1Turn;
        }

        // put draw card on discard pile if not used
        if (drawCard !== undefined && action !== 'draw') {
          discardPile.push(drawCard);
          drawCard = undefined;
        } else if (!isGameStart(convertToBoard(boardP1))) {
          // put deck card on discard pile
          discardPile.push(deck.pop() as number);
        }
      } else {
        const { action, location } = bot2(
          convertToBoard(boardP2),
          convertToBoard(boardP1),
          discardPile[discardPile.length - 1],
          drawCard,
          discardPile
        );

        if (DEBUG) {
          console.log(
            `Turn ${turnCount} - action: ${action} ${location !== undefined ? '- location ' + location : ''}`
          );
          console.log(
            `Score: ${currentScore(boardP2)} - DiscardCard: ${discardPile[discardPile.length - 1]} - DrawCard: ${drawCard}`
          );
          showBoard(convertToBoard(boardP2));
          console.log('after');
        }

        // Check if flipped at game start
        if (isGameStart(convertToBoard(boardP2)) && action !== 'flip') {
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

            boardP2[location[0]][location[1]].value = drawCard as number;
            boardP2[location[0]][location[1]].isShown = true;

            drawCard = undefined;
            break;

          case 'takeFromDiscardPile':
            if (!location) {
              throw new Error('Location is required to takeFromDiscardPile');
            }

            boardP2[location[0]][location[1]].value =
              discardPile.pop() as number;
            boardP2[location[0]][location[1]].isShown = true;
            break;

          case 'flip':
            if (!location) {
              throw new Error('Location is required to flip');
            }

            if (boardP2[location[0]][location[1]].isShown) {
              throw new Error('Card is already shown');
            }

            if (
              !isGameStart(convertToBoard(boardP2)) &&
              drawCard == undefined
            ) {
              throw new Error('You must draw a card before flipping');
            }

            boardP2[location[0]][location[1]].isShown = true;
            break;

          default:
            throw new Error('Invalid action');
        }

        DEBUG && showBoard(convertToBoard(boardP2));

        // clear columns
        clearColumns(boardP2);

        // check if game is over
        if (nothingToFlip(convertToBoard(boardP2))) {
          gameRunning = false;
          break;
        }

        if (action !== 'draw') {
          player1Turn = !player1Turn;
        }

        // put draw card on discard pile if not used
        if (drawCard !== undefined && action !== 'draw') {
          discardPile.push(drawCard);
          drawCard = undefined;
        } else if (!isGameStart(convertToBoard(boardP2))) {
          // put deck card on discard pile
          discardPile.push(deck.pop() as number);
        }
      }
    }
    results.push({
      points1: currentScore(boardP1),
      points2: currentScore(boardP2),
    });
  }
  return results;
};
