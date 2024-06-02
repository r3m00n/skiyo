import { Deck, SystemBoard } from '@/types';
import { clearColumns } from '@/src/utils/clear-columns';

describe('Clear Columns', () => {
  //   let { deck, board } = dealCards(createDeck());

  it('should clear', () => {
    let board: SystemBoard = [
      [
        { value: -2, isShown: true },
        { value: -2, isShown: true },
        { value: -2, isShown: true },
      ],
      [
        { value: 2, isShown: true },
        { value: 2, isShown: true },
        { value: 2, isShown: true },
      ],
      [
        { value: -2, isShown: true },
        { value: -2, isShown: false },
        { value: -2, isShown: true },
      ],
    ];

    const newBoard = clearColumns(board);
    expect(newBoard.length).toEqual(1);
  });

  it('should not clear', () => {
    const board: SystemBoard = [
      [
        { value: -2, isShown: false },
        { value: -2, isShown: true },
        { value: -2, isShown: true },
      ],
      [
        { value: 2, isShown: true },
        { value: 2, isShown: true },
        { value: 2, isShown: false },
      ],
      [
        { value: 0, isShown: false },
        { value: 0, isShown: false },
        { value: 0, isShown: false },
      ],
      [
        { value: 1, isShown: false },
        { value: 2, isShown: false },
        { value: 3, isShown: false },
      ],
    ];

    const newBoard = clearColumns(board);
    // expext new board to equal old board
    expect(newBoard).toEqual(board);
  });

  it('should handle empty', () => {
    const emptyBoard = clearColumns([]);
    // expext new board to equal old board
    expect(emptyBoard.length).toEqual(0);
  });
});
