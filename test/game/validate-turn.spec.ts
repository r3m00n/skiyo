import {
  validateTurn,
  validateAction,
  validateLocation,
} from '../../src/game/validate-turn';

import { Card, SystemBoard } from '../../src/types';

describe('validateTurn', () => {
  let board: SystemBoard;
  let drawCard: Card;

  beforeEach(() => {
    board = [
      [
        {
          isShown: false,
          value: 0,
        },
        {
          isShown: false,
          value: 0,
        },
        {
          isShown: false,
          value: 0,
        },
      ],
      [
        {
          isShown: false,
          value: 0,
        },
        {
          isShown: false,
          value: 0,
        },
        {
          isShown: false,
          value: 0,
        },
      ],
      [
        {
          isShown: false,
          value: 0,
        },
        {
          isShown: false,
          value: 0,
        },
        {
          isShown: false,
          value: 0,
        },
      ],
      [
        {
          isShown: false,
          value: 0,
        },
        {
          isShown: false,
          value: 0,
        },
        {
          isShown: false,
          value: 0,
        },
      ],
    ];
    drawCard = 1;
  });

  it('throws error if location is not provided for flip action', () => {
    expect(() =>
      validateTurn({ action: 'flip', location: undefined }, board, drawCard)
    ).toThrow('Location is required for flip action');
  });

  it('throws error if card at location is already shown', () => {
    board[0][0].isShown = true;
    expect(() =>
      validateTurn({ action: 'flip', location: [0, 0] }, board, drawCard)
    ).toThrow('Cannot flip a card that is already shown');
  });
});

describe('validateAction', () => {
  it('throws error for an invalid action', () => {
    expect(() => validateAction('invalidAction')).toThrow('Invalid Action');
  });

  it('does not throw error for a valid action', () => {
    expect(() => validateAction('draw')).not.toThrow();
    expect(() => validateAction('takeFromDiscardPile')).not.toThrow();
    expect(() => validateAction('takeFromDrawPile')).not.toThrow();
    expect(() => validateAction('flip')).not.toThrow();
  });
});

describe('validateLocation', () => {
  it('does not throw error for undefined location', () => {
    expect(() => validateLocation(undefined)).not.toThrow();
  });

  it('throws error for location with length not equal to 2', () => {
    expect(() => validateLocation([0])).toThrow('Invalid Location');
    expect(() => validateLocation([0, 1, 2])).toThrow('Invalid Location');
  });

  it('throws error for negative coordinates', () => {
    expect(() => validateLocation([-1, 0])).toThrow('Invalid Location');
    expect(() => validateLocation([0, -1])).toThrow('Invalid Location');
  });

  it('throws error for out of bounds coordinates', () => {
    expect(() => validateLocation([4, 0])).toThrow('Invalid Location');
    expect(() => validateLocation([0, 3])).toThrow('Invalid Location');
  });

  it('throws error for non-integer coordinates', () => {
    expect(() => validateLocation([0.5, 1])).toThrow('Invalid Location');
    expect(() => validateLocation([1, 1.5])).toThrow('Invalid Location');
  });

  it('does not throw error for valid location', () => {
    expect(() => validateLocation([0, 0])).not.toThrow();
    expect(() => validateLocation([3, 2])).not.toThrow();
  });
});
