import { DataTypes } from "sequelize";
import { sequelize } from "../db";

export const Team = sequelize.define("team", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
