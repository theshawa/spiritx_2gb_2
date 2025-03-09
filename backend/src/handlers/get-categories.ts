import { RequestHandler } from "express";
import { sequelize } from "../db";
import { Player } from "../models/player";

export const getCategoriesHandler: RequestHandler = async (req, res) => {
  const categories = await Player.findAll({
    attributes: [
      [sequelize.fn("DISTINCT", sequelize.col("category")), "category"],
    ],
    order: [["category", "ASC"]],
  });
  res.json(categories.map((c) => c.dataValues.category));
};
