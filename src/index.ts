import { battle } from '@/game/battle';
import { showResult } from '@/game/show-result';

import { michaelBot } from './bot/michael';
import { randomBot } from './bot/random';
import { rushBot } from './bot/rush';
import { gptBot } from './bot/gpt';

showResult(battle(michaelBot, rushBot));
