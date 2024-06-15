import { Result } from '../types';

export const showResult = (result: Result[]) => {
  // console.log(result);

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
  const bot1MinPoints = result.reduce(
    (acc, r) => Math.min(acc, r.points1),
    Infinity
  );
  const bot2MinPoints = result.reduce(
    (acc, r) => Math.min(acc, r.points2),
    Infinity
  );
  const bot1MaxPoints = result.reduce(
    (acc, r) => Math.max(acc, r.points1),
    -Infinity
  );
  const bot2MaxPoints = result.reduce(
    (acc, r) => Math.max(acc, r.points2),
    -Infinity
  );
  const bot1AverageColumns = round(
    result.reduce((acc, r) => acc + r.columns1, 0) / result.length
  );
  const bot2AverageColumns = round(
    result.reduce((acc, r) => acc + r.columns2, 0) / result.length
  );
  const bot1MinColumns = result.reduce(
    (acc, r) => Math.min(acc, r.columns1),
    Infinity
  );
  const bot2MinColumns = result.reduce(
    (acc, r) => Math.min(acc, r.columns2),
    Infinity
  );
  const bot1MaxColumns = result.reduce(
    (acc, r) => Math.max(acc, r.columns1),
    -Infinity
  );
  const bot2MaxColumns = result.reduce(
    (acc, r) => Math.max(acc, r.columns2),
    -Infinity
  );
  const averageTurns = round(
    result.reduce((acc, r) => acc + r.turns, 0) / result.length
  );
  const shortestGame = result.reduce((acc, r) => {
    if (r.turns !== 0) {
      return Math.min(acc, r.turns);
    }
    return acc;
  }, Infinity);
  const longestGame = result.reduce((acc, r) => Math.max(acc, r.turns), 0);

  console.log(
    `Bot${bot1Wins > bot2Wins ? 1 : 2} wins ${
      bot1Wins > bot2Wins ? bot1WinPercentage : bot2WinPercentage
    }% of the games!`
  );
  console.log(
    `B1 average: ${bot1AveragePoints.toString().padEnd(6)}| Min: ${bot1MinPoints
      .toString()
      .padEnd(3)} Max: ${bot1MaxPoints.toString().padEnd(3)}`
  );
  console.log(
    `B2 average: ${bot2AveragePoints.toString().padEnd(6)}| Min: ${bot2MinPoints
      .toString()
      .padEnd(3)} Max: ${bot2MaxPoints.toString().padEnd(3)}`
  );
  console.log(
    `B1 ~ Cols.: ${bot1AverageColumns.toString().padEnd(6)}| Min: ${bot1MinColumns
      .toString()
      .padEnd(3)} Max: ${bot1MaxColumns.toString().padEnd(3)}`
  );
  console.log(
    `B2 ~ Cols.: ${bot2AverageColumns.toString().padEnd(6)}| Min: ${bot2MinColumns
      .toString()
      .padEnd(3)} Max: ${bot2MaxColumns.toString().padEnd(3)}`
  );
  console.log(
    `Avg. Turns: ${averageTurns.toString().padEnd(6)}| Min: ${shortestGame
      .toString()
      .padEnd(3)} Max: ${longestGame.toString().padEnd(3)}`
  );
};

const round = (num: number): number => Math.round(num * 100) / 100;
