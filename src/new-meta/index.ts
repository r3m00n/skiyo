import { simulateGame } from '@/game';
import { showStats } from '../game/show-stats';

import { randomBot as bot1 } from '../bots/random';
import { gptBot as bot2 } from '../bots/chatgpt';

const results = simulateGame(bot1, bot2);
showStats(results);
