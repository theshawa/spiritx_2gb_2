import { RequestHandler } from "express";
import { z } from "zod";
import { Player } from "../models/player";

export const createPlayerHandlerBodySchema = z.object({
  name: z.string().trim(),
  category: z.string().trim(),
  university: z.string().trim(),
  totalRuns: z.number().int().nonnegative().default(0),
  ballsFaced: z.number().int().nonnegative().default(0),
  inningsPlayed: z.number().int().nonnegative().default(0),
  wickets: z.number().int().nonnegative().default(0),
  oversBowled: z.number().nonnegative().default(0),
  runsConceded: z.number().int().nonnegative().default(0),
});

export const createPlayerHandler: RequestHandler = async (req, res) => {
  const body = req.body as z.infer<typeof createPlayerHandlerBodySchema>;

  const created = await Player.create({
    name: body.name,
    category: body.category,
    university: body.university,
    totalRuns: body.totalRuns,
    ballsFaced: body.ballsFaced,
    inningsPlayed: body.inningsPlayed,
    wickets: body.wickets,
    oversBowled: body.oversBowled,
    runsConceded: body.runsConceded,
  });

  res.json({
    id: created.dataValues.id,
  });
};
