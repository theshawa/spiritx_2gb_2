import { DataTypes } from "sequelize";
import { sequelize } from "../db";

export const Player = sequelize.define("player", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  university: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalRuns: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  ballsFaced: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  inningsPlayed: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  wickets: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  oversBowled: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  runsConceded: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  editable: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});
