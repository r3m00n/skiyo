export const showStats = (
  results: { player1won: boolean; scoreP1: number; scoreP2: number }[]
) => {
  const player1Wins = results.filter((result) => result.player1won).length;
  const player2Wins = results.filter((result) => !result.player1won).length;
  const player1WinRate = player1Wins / results.length;
  const player2WinRate = player2Wins / results.length;
  const player1AverageScore =
    results.reduce((acc, result) => acc + result.scoreP1, 0) / results.length;
  const player2AverageScore =
    results.reduce((acc, result) => acc + result.scoreP2, 0) / results.length;

  console.log('Player 1 wins:', player1Wins);
  console.log('Player 2 wins:', player2Wins);
  console.log('Player 1 win rate:', player1WinRate);
  console.log('Player 2 win rate:', player2WinRate);
  console.log('Player 1 average score:', player1AverageScore);
  console.log('Player 2 average score:', player2AverageScore);

  console.log(results);
};
