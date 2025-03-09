import { RequestHandler } from "express";

export const logoutHandler: RequestHandler = async (req, res, next) => {
  res.clearCookie("refreshToken");
  res.sendStatus(200);
};
