// @ts-nocheck
import type { NHLGameScore, RankingResult } from '../types/types.ts';

/*
Things to consider when ranking games:
1. each game ranking mechinism should be in it's own file/funciton. THis allos for plug and play with the different rankings that you want to use.
2. +50 points if a fav team wins.
3. +50 points the ame includes one of your fav teams.
4. -100 points if your fav team loses by more than 3 points. But only if the fav team is not playing againt another fav team.
5. +50 points in the game went to overtime.
6. +20 points in the game has over 50 hits.
7. +30 points in the game has over 70 hits.
8. +50 points if the game has over 100 hits.
9. +50 points if the game was within 1 goal, but didn't go to overtime.
10. +50 points in if the game has an empty net goal by a fav team.
11. +50 points if the game goes to overtime because of an empty net goal.
12. +50 points if the game has over 5 goals for each team.
13. +50 points if the game has over 30 shots for each team.
14. +50 points if the game has over 50 shots for a fav team.
15. +50 points if a team comes back by over 3 goals, but the team they beat is not a fav team.
16. +50 points if there was more than 2 fights in the game.
*/

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
