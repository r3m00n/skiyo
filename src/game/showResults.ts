import { Result } from '@/types';

export const showResults = (results: Result[]): void => {
  const bot1Wins = results.filter((r) => r.points1 < r.points2).length;
  const bot2Wins = results.filter((r) => r.points2 < r.points1).length;
  const totalGames = results.length;
  const bot1WinPercentage = (bot1Wins / totalGames) * 100;
  const bot2WinPercentage = (bot2Wins / totalGames) * 100;
  console.log(
    `Bot${bot1Wins > bot2Wins ? 1 : 2} wins ${bot1Wins > bot2Wins ? bot1WinPercentage : bot2WinPercentage}% of the games!`
  );
  const ties = results.filter((r) => r.points1 === r.points2).length;
  const averagePoints1 =
    results.reduce((acc, r) => acc + r.points1, 0) / totalGames;
  const averagePoints2 =
    results.reduce((acc, r) => acc + r.points2, 0) / totalGames;

  console.log(`Bot1 average: ${averagePoints1}`);
  console.log(`Bot2 average: ${averagePoints2}`);
  console.log(`Ties: ${ties}`);
};
