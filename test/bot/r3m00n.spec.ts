import { r3m00nBot } from '../../src/bot/r3m00n';
import { basicTests } from './utils';
import { afterStartBoard, turn1Board1 } from './utils/boards';

basicTests(r3m00nBot);

describe('r3m00nBot', () => {
  it('should flip second card in same column if first card is high', () => {
    const { action, location } = r3m00nBot(
      [
        [12, undefined, undefined],
        [undefined, undefined, undefined],
        [undefined, undefined, undefined],
        [undefined, undefined, undefined],
      ],
      turn1Board1,
      0,
      undefined,
      [0]
    );
    expect(action).toBe('flip');
    expect(location![0]).toBe(0);
  });

  it('should flip card in next column if first card is low', () => {
    const { action, location } = r3m00nBot(
      [
        [0, undefined, undefined],
        [undefined, undefined, undefined],
        [undefined, undefined, undefined],
        [undefined, undefined, undefined],
      ],
      turn1Board1,
      0,
      undefined,
      [0]
    );
    expect(action).toBe('flip');
    expect(location![0]).not.toBe(0);
  });
});
