import { sequelize } from "../db";

export const PlayerTeam = sequelize.define(
  "playerTeam",
  {},
  { timestamps: false }
);
