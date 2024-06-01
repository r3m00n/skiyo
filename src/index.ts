import { simulateGame } from './game';

const results: number[] = [];
for (let i = 0; i < 1000; i++) {
  results.push(simulateGame());
}
const average = results.reduce((a, b) => a + b, 0) / results.length;
const max = Math.max(...results);
const min = Math.min(...results);

console.log(`Average: ${average}, Max: ${max}, Min: ${min}`);
