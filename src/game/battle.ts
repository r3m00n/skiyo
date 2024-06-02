import { Bot, Result } from '@/types';
import { singleGame } from './simulate-game';

export const battle = (
  bot1: Bot,
  bot2: Bot,
  simulations: number = 1000
): Result[] => {
  const results = [];

  for (let i = 0; i < simulations; i++) {
    results.push(singleGame(bot1, bot2));
  }

  return results;
};
