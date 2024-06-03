import { debugBot } from '../../src/bot/debug';
import { basicTests } from './utils';
import { afterStartBoard } from './utils/boards';

basicTests(debugBot);

describe('debugBot', () => {
  it('should always drawFromDisgardPile and put 0,0', () => {
    const turn = debugBot(afterStartBoard, afterStartBoard, 0, undefined, [0]);
    expect(turn).toMatchObject({
      action: 'takeFromDiscardPile',
      location: [0, 0],
    });
  });
});
