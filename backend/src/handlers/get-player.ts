import { RequestHandler } from "express";
import { AppError } from "../lib/error";
import { Player } from "../models/player";
import { calculateStats } from "../utils/calculate-stats";

export const getPlayerHandler: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { more } = req.query;

  const player = await Player.findOne({
    where: { id },
  });
  if (!player) {
    throw new AppError("Player not found", 404);
  }

  if (more) {
    const stats = calculateStats(player);
    player.setDataValue("stats", stats);
  }

  res.json(player);
};
