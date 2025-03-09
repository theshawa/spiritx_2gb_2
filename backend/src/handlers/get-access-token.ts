import { RequestHandler } from "express";
import { ACCESS_TOKEN_EXPIRY } from "../constants";
import { User } from "../models/user";
import { TokenData } from "../token-data";
import { createToken, verifyToken } from "../utils/jwt";

export const getAccessTokenHandler: RequestHandler = async (req, res) => {
  const { cookies } = req;
  if (cookies.refreshToken) {
    let refreshTokenData;
    try {
      refreshTokenData = await verifyToken(cookies.refreshToken);
    } catch (error) {
      res.clearCookie("refreshToken");
      res.status(404).json({ message: "Auth not found" });
      return;
    }

    const parsedData = TokenData.parse(refreshTokenData);

    const accessToken = await createToken(
      {
        id: parsedData.id,
        username: parsedData.username,
        role: parsedData.role,
      },
      ACCESS_TOKEN_EXPIRY
    );

    if (parsedData.role === "admin") {
      res.json({
        username: "admin",
        role: "admin",
        accessToken,
      });
      return;
    }

    const user = await User.findOne({ where: { id: parsedData.id } });
    if (!user) {
      throw new Error("User not found");
    }

    res.json({
      username: user.dataValues.username,
      name: user.dataValues.name,
      id: user.dataValues.id,
      budget: user.dataValues.budget,
      role: "user",
      accessToken,
    });
    return;
  }

  res.status(404).json({ message: "Auth not found" });
};
