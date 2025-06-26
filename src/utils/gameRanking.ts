// utils/gameRanking.ts

import type { NHLGameScore, RankingResult } from '../types/types.ts';

export const calculateGameScore = (game: NHLGameScore, favoriteTeams: string[]): RankingResult => {
  let score = 0;
  // Check if the game includes a favorite team
  const homeIsFavorite = favoriteTeams.includes(game.homeTeam.abbrev);
  const awayIsFavorite = favoriteTeams.includes(game.awayTeam.abbrev);

  // Only calculate scores for completed games
  // 1. Games get 50 points if they include a favorite team
  if (homeIsFavorite || awayIsFavorite) {
    score += 50;

    // 2. Games get 50 points if a favorite team wins
    const homeWon = game.homeTeam.score > game.awayTeam.score;
    const awayWon = game.awayTeam.score > game.homeTeam.score;

    if ((homeWon && homeIsFavorite) || (awayWon && awayIsFavorite)) {
      score += 50;

      // 3. Games get 50 points if a favorite team wins by less than 2 points
      const scoreDifference = Math.abs(game.homeTeam.score - game.awayTeam.score);
      if (scoreDifference === 1) {
        score += 50;
      }
    }
  }

  return {
    game,
    score,
  };
};

export const rankGames = (games: NHLGameScore[], favoriteTeams: string[]): RankingResult[] => {
  return games
    .map(game => calculateGameScore(game, favoriteTeams))
    .sort((a, b) => b.score - a.score);
};
