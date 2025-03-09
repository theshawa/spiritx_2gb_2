import { Sequelize } from "sequelize";

const credentials = {
  database: process.env.DB_NAME || "",
  username: process.env.DB_USERNAME || "",
  password: process.env.DB_PASSWORD || "",
  host: process.env.DB_HOST || "",
  port: process.env.DB_PORT || 3306,
};

export const sequelize = new Sequelize(
  credentials.database,
  credentials.username,
  credentials.password,
  {
    host: credentials.host,
    dialect: "mysql",
    logging: true,
    port: parseInt(credentials.port as string),
  }
);
