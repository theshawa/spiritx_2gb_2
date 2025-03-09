export interface PlayerData {
  id: number;
  name: string;
  university: number;
  category: number;
  totalRuns: number;
  ballsFaced: number;
  inningsPlayed: number;
  wickets: number;
  oversBowled: number;
  runsConceded: number;
  editable: boolean;
}

export interface PlayerWithStatsData {
  id: number;
  name: string;
  university: number;
  category: number;
  totalRuns: number;
  ballsFaced: number;
  inningsPlayed: number;
  wickets: number;
  oversBowled: number;
  runsConceded: number;
  editable: boolean;
  stats: {
    points: number;
    value: number;
    battingStrikeRate: number;
    bowlingStrikeRate: number;
    economyRate: number;
    battingAverage: number;
  };
}
