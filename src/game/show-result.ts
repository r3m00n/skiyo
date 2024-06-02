import { Result } from '@/types';

export const showResult = (result: Result[]) => {
  const bot1Wins = result.filter((r) => r.points1 < r.points2).length;
  const bot2Wins = result.filter((r) => r.points2 < r.points1).length;
  const decidedGames = bot1Wins + bot2Wins;
  const bot1WinPercentage = round((bot1Wins / decidedGames) * 100);
  const bot2WinPercentage = round((bot2Wins / decidedGames) * 100);
  const bot1AveragePoints = round(
    result.reduce((acc, r) => acc + r.points1, 0) / result.length
  );
  const bot2AveragePoints = round(
    result.reduce((acc, r) => acc + r.points2, 0) / result.length
  );
  const bot1MinPoints = result.reduce((acc, r) => Math.min(acc, r.points1), 0);
  const bot2MinPoints = result.reduce((acc, r) => Math.min(acc, r.points2), 0);
  const bot1MaxPoints = result.reduce((acc, r) => Math.max(acc, r.points1), 0);
  const bot2MaxPoints = result.reduce((acc, r) => Math.max(acc, r.points2), 0);
  const averageTurns = round(
    result.reduce((acc, r) => acc + r.turns, 0) / result.length
  );

  console.log(
    `Bot${bot1Wins > bot2Wins ? 1 : 2} wins ${bot1Wins > bot2Wins ? bot1WinPercentage : bot2WinPercentage}% of the games!`
  );
  console.log(
    `B1 average: ${bot1AveragePoints.toString().padEnd(6)}| Min: ${bot1MinPoints.toString().padEnd(3)} Max: ${bot1MaxPoints.toString().padEnd(3)}`
  );
  console.log(
    `B2 average: ${bot2AveragePoints.toString().padEnd(6)}| Min: ${bot2MinPoints.toString().padEnd(3)} Max: ${bot2MaxPoints.toString().padEnd(3)}`
  );
  console.log(`Average Turns: ${averageTurns}`);
};

const round = (num: number): number => Math.round(num * 100) / 100;
