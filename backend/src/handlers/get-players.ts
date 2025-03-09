import { RequestHandler } from "express";
import { Player } from "../models/player";

export const getPlayersHandler: RequestHandler = async (req, res) => {
  const players = await Player.findAll({
    order: [
      ["createdAt", "DESC"],
      ["name", "ASC"],
    ],
  });
  res.json(players);
};
