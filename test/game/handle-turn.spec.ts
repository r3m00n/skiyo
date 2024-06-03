import { handleTurn } from '../../src/game/handle-turn';
import { shuffleDeck } from '../../src/utils/game-helpers';
import { validateTurn } from '../../src/game/validate-turn';
import { Card, Deck, SystemBoard, Turn } from '../../src/types';

jest.mock('../../src/utils/game-helpers', () => ({
  shuffleDeck: jest.fn(),
}));

jest.mock('../../src/game/validate-turn', () => ({
  validateTurn: jest.fn(),
}));

describe('handleTurn', () => {
  let board: SystemBoard;
  let deck: Deck;
  let discardPile: Deck;
  let drawCard: Card;
  let isPlayer1Turn: boolean;

  beforeEach(() => {
    board = [
      [
        { value: 1, isShown: false },
        { value: 2, isShown: false },
        { value: 3, isShown: false },
      ],
      [
        { value: 4, isShown: false },
        { value: 5, isShown: false },
        { value: 6, isShown: false },
      ],
      [
        { value: 7, isShown: false },
        { value: 8, isShown: false },
        { value: 9, isShown: false },
      ],
      [
        { value: 10, isShown: false },
        { value: 11, isShown: false },
        { value: 12, isShown: false },
      ],
    ];
    deck = [13, 14, 15];
    discardPile = [16, 17, 18];
    drawCard = undefined;
    isPlayer1Turn = true;
  });

  it('handles takeFromDiscardPile action', () => {
    const turn: Turn = { action: 'takeFromDiscardPile', location: [0, 0] };
    const result = handleTurn(
      turn,
      board,
      deck,
      discardPile,
      drawCard,
      isPlayer1Turn
    );

    expect(result.board[0][0].value).toBe(18);
    expect(result.board[0][0].isShown).toBe(true);
    expect(result.discardPile[result.discardPile.length - 1]).toBe(1);
    expect(result.isPlayer1Turn).toBe(false);
  });

  it('handles draw action', () => {
    const turn: Turn = { action: 'draw' };
    const result = handleTurn(
      turn,
      board,
      deck,
      discardPile,
      drawCard,
      isPlayer1Turn
    );

    expect(result.drawCard).toBe(15);
    expect(result.deck.length).toBe(2);
    expect(result.isPlayer1Turn).toBe(true);
  });

  it('handles takeFromDrawPile action', () => {
    drawCard = 19;
    const turn: Turn = { action: 'takeFromDrawPile', location: [0, 0] };
    const result = handleTurn(
      turn,
      board,
      deck,
      discardPile,
      drawCard,
      isPlayer1Turn
    );

    expect(result.board[0][0].value).toBe(19);
    expect(result.board[0][0].isShown).toBe(true);
    expect(result.discardPile[result.discardPile.length - 1]).toBe(1);
    expect(result.drawCard).toBe(undefined);
    expect(result.isPlayer1Turn).toBe(false);
  });

  it('handles flip action', () => {
    const turn: Turn = { action: 'flip', location: [0, 0] };
    const result = handleTurn(
      turn,
      board,
      deck,
      discardPile,
      drawCard,
      isPlayer1Turn
    );

    expect(result.board[0][0].isShown).toBe(true);
    expect(result.isPlayer1Turn).toBe(false);
  });
});
