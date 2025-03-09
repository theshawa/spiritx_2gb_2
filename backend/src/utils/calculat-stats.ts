import { Model } from "sequelize";

export const calculateStats = (player: Model<any, any>) => {
  const battingStrikeRate =
    (player.dataValues.totalRuns / player.dataValues.ballsFaced) * 100;
  const bowlingStrikeRate =
    player.dataValues.ballsBowled / player.dataValues.wickets;

  const economyRate =
    player.dataValues.runsConceded / player.dataValues.oversBowled;

  const battingAverage =
    player.dataValues.totalRuns / player.dataValues.inningsPlayed;

  const points =
    battingStrikeRate / 5 +
    battingAverage * 0.8 +
    ((500 / bowlingStrikeRate || 0) + 140 / economyRate);

  const value = (9 * points + 100) * 1000;

  return {
    points: points,
    value: value,
    battingStrikeRate,
    bowlingStrikeRate,
    economyRate,
    battingAverage,
  };
};
