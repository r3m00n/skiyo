import { Result } from '@/types';

export const showResults = (results: Result[]): void => {
  //   show total wins, winpercentage, average points
  const totalWins1 = results.filter(
    (result) => result.points1 < result.points2
  ).length;
  const totalWins2 = results.filter(
    (result) => result.points1 > result.points2
  ).length;
  const totalTies = results.filter(
    (result) => result.points1 === result.points2
  ).length;
  const totalGames = results.length;

  const averagePoints1 =
    results.reduce((acc, result) => acc + result.points1, 0) / totalGames;
  const averagePoints2 =
    results.reduce((acc, result) => acc + result.points2, 0) / totalGames;

  console.log('Player 1 Wins:', totalWins1);
  console.log('Player 2 Wins:', totalWins2);
  console.log('Ties:', totalTies);
  console.log('Player 1 Average Points:', averagePoints1.toFixed(2));
  console.log('Player 2 Average Points:', averagePoints2.toFixed(2));
};
