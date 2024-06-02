import { michaelBot as Bot1 } from './bots/michael';
import { randomBot } from './bots/random';
import { rushBot as Bot2 } from './bots/rush';
import { gptBot } from './bots/gpt';
import { pickyBot } from './bots/picky';

import { simulateGame } from './game';
import { showResults } from './game/showResults';

const resulsts = simulateGame(Bot1, Bot2, 1000);
showResults(resulsts);
