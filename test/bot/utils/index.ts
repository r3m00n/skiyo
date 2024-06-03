import { Bot } from '../../../src/types';
import { turn0Board, turn1Board1 } from './boards';

export const basicTests = (bot: Bot) => {
  describe('Game Start', () => {
    it('should always flip a card at turn 1', () => {
      const { action } = bot(turn0Board, turn0Board, 0, undefined, [0]);
      expect(action).toBe('flip');
    });

    it('should always flip a card at turn 2', () => {
      const { action } = bot(turn1Board1, turn1Board1, 0, undefined, [0]);
      expect(action).toBe('flip');
    });
  });
};
