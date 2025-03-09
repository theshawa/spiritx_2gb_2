import { RequestHandler } from "express";
import { Player } from "../models/player";
import { Team } from "../models/team";

export const getTeamsHandler: RequestHandler = async (req, res) => {
  const userId = res.locals.auth.id;
  const teams = await Team.findAll({
    include: [
      {
        model: Player,
        as: "players",
        through: { attributes: [] },
      },
    ],
    where: { userId },
    order: [
      ["createdAt", "DESC"],
      ["name", "ASC"],
    ],
  });
  res.json(teams);
};
