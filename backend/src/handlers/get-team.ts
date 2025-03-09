import { RequestHandler } from "express";
import { AppError } from "../lib/error";
import { Player } from "../models/player";
import { Team } from "../models/team";

export const getTeamHandler: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const team = await Team.findOne({
    include: [
      {
        model: Player,
        as: "players",
        through: { attributes: [] },
      },
    ],
    where: { id },
    order: [
      ["createdAt", "DESC"],
      ["name", "ASC"],
    ],
  });

  if (!team) {
    throw new AppError("Team not found", 404);
  }

  res.json(team);
};
