import { Player } from "./models/player";

import csv from "csv-parser";
import fs from "fs";
import { sequelize } from "./db";
import { associateModels } from "./models/associations";

const insertData = async () => {
  const dataCsv = "sample_data.csv";
  const players: Record<string, any>[] = [];
  await new Promise<void>((resolve) => {
    fs.createReadStream(dataCsv)
      .pipe(csv())
      .on("data", async (row) => {
        console.log(row);
        const player: Record<string, any> = {
          name: row["Name"],
          university: row["University"],
          category: row["Category"],
          totalRuns: row["Total Runs"],
          ballsFaced: row["Balls Faced"],
          inningsPlayed: row["Innings Played"],
          wickets: row["Wickets"],
          oversBowled: row["Overs Bowled"],
          runsConceded: row["Runs Conceded"],
          editable: false,
        };
        for (let key in player) {
          if (player[key] === undefined) {
            return;
          }
        }
        players.push(player);
      })
      .on("end", async () => {
        await Player.bulkCreate(players);
        console.log(`${players.length} players inserted`);
        resolve();
      });
  });
};

export const initDb = async () => {
  console.log("initializing db");

  associateModels();

  await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
  await sequelize.sync({ force: true });
  await sequelize.query("SET FOREIGN_KEY_CHECKS=1");

  await insertData();

  console.log("db initialized");
};

initDb();
