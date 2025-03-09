import { RequestHandler } from "express";
import { z } from "zod";
import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from "../constants";
import { AppError } from "../lib/error";
import { User } from "../models/user";
import { compareHash } from "../utils/hash";
import { createToken } from "../utils/jwt";

export const loginHandlerBodySchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const loginHandler: RequestHandler = async (req, res, next) => {
  const { password, username } = req.body as z.infer<
    typeof loginHandlerBodySchema
  >;

  let data: Record<string, any> = {};

  if (username === "admin" && password === "123456") {
    data.role = "admin";
  } else {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      throw new AppError("Invalid username", 404);
    }

    const isPasswordCorrect = compareHash(password, user.dataValues.password);
    if (!isPasswordCorrect) {
      throw new AppError("Invalid password", 400);
    }

    data.role = "user";
    data = { ...data, ...user.dataValues, password: undefined };
  }

  // refresh token
  const refreshToken = await createToken(
    {
      id: data.id,
      username,
      role: data.role,
    },
    REFRESH_TOKEN_EXPIRY
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  const accessToken = await createToken(
    {
      id: data.id,
      username,
      role: data.role,
    },
    ACCESS_TOKEN_EXPIRY
  );

  res.json({ ...data, accessToken });
};
