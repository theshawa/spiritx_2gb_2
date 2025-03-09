import { RequestHandler } from "express";
import { z } from "zod";
import { Team } from "../models/team";

export const createTeamHandlerBodySchema = z.object({
  name: z.string().trim(),
});

export const createTeamHandler: RequestHandler = async (req, res) => {
  const { name } = req.body as z.infer<typeof createTeamHandlerBodySchema>;
  const userId = res.locals.auth.id;

  const created = await Team.create({
    name,
    userId,
  });

  res.json({
    id: created.dataValues.id,
  });
};
