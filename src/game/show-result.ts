import { Result } from '@/types';

export const showResult = (result: Result[]) => {
  const bot1Wins = result.filter((r) => r.points1 < r.points2).length;
  const bot2Wins = result.filter((r) => r.points2 < r.points1).length;
  const bot1WinPercentage = (bot1Wins / result.length) * 100;
  const bot2WinPercentage = (bot2Wins / result.length) * 100;
  const bot1AveragePoints =
    result.reduce((acc, r) => acc + r.points1, 0) / result.length;
  const bot2AveragePoints =
    result.reduce((acc, r) => acc + r.points2, 0) / result.length;
  const averageTurns =
    result.reduce((acc, r) => acc + r.turns, 0) / result.length;

  console.log(
    `Bot${bot1Wins > bot2Wins ? 1 : 2} wins ${bot1Wins > bot2Wins ? bot1WinPercentage : bot2WinPercentage}% of the games!`
  );
  console.log(`Bot1 average: ${bot1AveragePoints}`);
  console.log(`Bot2 average: ${bot2AveragePoints}`);
  console.log(
    `Draws: ${result.length - bot1Wins - bot2Wins} (${((result.length - bot1Wins - bot2Wins) / result.length) * 100}%)`
  );
  console.log(`Average Turns: ${averageTurns}`);
};
