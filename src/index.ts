import { simulateGame } from './game';
import { randomBot as bot1 } from './bots/random';
import { gptBot as bot2 } from './bots/gpt';
import { showStats } from './game/show-stats';

const results: { player1won: boolean; scoreP1: number; scoreP2: number }[] = [];
for (let i = 0; i < 10; i++) {
  results.push(simulateGame(bot1, bot2));
}
showStats(results);
