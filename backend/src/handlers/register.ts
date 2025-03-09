import { RequestHandler } from "express";
import { z } from "zod";
import { AppError } from "../lib/error";
import { User } from "../models/user";
import { hashString } from "../utils/hash";

export const registerHandlerBodySchema = z.object({
  name: z.string().trim(),
  username: z.string().trim().min(8),
  password: z.string().trim().min(8),
});

export const registerHandler: RequestHandler = async (req, res, next) => {
  const { password, username, name } = req.body as z.infer<
    typeof registerHandlerBodySchema
  >;

  const alreadyUser = await User.findOne({ where: { username } });

  if (alreadyUser) {
    throw new AppError("User with this username already exists", 400);
  }

  const created = await User.create({
    name,
    username,
    password: hashString(password),
  });

  res.json({
    id: created.dataValues.id,
    username: created.dataValues.username,
    name: created.dataValues.name,
  });
};
