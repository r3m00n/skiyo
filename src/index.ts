import { battle } from '@/game/battle';
import { showResult } from '@/game/show-result';
import { randomBot } from './bot/random';
import { rushBot } from './bot/rush';

showResult(battle(randomBot, rushBot, 1));
