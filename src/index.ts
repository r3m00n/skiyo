// import { michaelBot as Bot1 } from './bots/michael';
import { rushBot as Bot2 } from './bots/rush';
import { randomBot as Bot1 } from './bots/random';

import { simulateGame } from './game';
import { showResults } from './game/showResults';

const resulsts = simulateGame(Bot1, Bot2, 1000);
showResults(resulsts);
