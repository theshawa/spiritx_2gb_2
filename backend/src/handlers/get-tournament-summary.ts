import { RequestHandler } from "express";
import { Player } from "../models/player";

export const getTournamentSummaryHandler: RequestHandler = async (req, res) => {
  const overallRuns = await Player.sum("totalRuns");
  const overallWickets = await Player.sum("wickets");
  const highestRunScorer = await Player.findOne({
    order: [["totalRuns", "DESC"]],
  });
  const highestWicketTaker = await Player.findOne({
    order: [["wickets", "DESC"]],
  });

  res.json({
    overallRuns,
    overallWickets,
    highestRunScorer: highestRunScorer,
    highestWicketTaker: highestWicketTaker,
  });
};
