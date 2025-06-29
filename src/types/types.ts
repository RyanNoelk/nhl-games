// @ts-nocheck
export interface TeamName {
  default: string;
}

export interface NHLGameScore {
  id: number;
  season: number;
  gameType: number;
  gameDate: string;
  venue: {
    default: string;
  };
  startTimeUTC: string;
  homeTeam: {
    id: number;
    name: TeamName;
    abbrev: string;
    score: number;
  };
  awayTeam: {
    id: number;
    name: TeamName;
    abbrev: string;
    score: number;
  };
  gameState: string;
  gameScheduleState: string;
}

export interface NHLScoreResponse {
  games: NHLGameScore[];
  currentDate: string;
}

export interface RankingResult {
  game: NHLGameScore;
  score: number;
}
