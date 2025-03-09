import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants";

const jwtSecret = "iAMBatman";
const jwtIssuer = "localhost";

export const createToken = async (
  data: Record<string, any>,
  expiresIn: any
) => {
  return jwt.sign(data, JWT_SECRET, {
    expiresIn,
    issuer: jwtIssuer,
  });
};

export const verifyToken = async (token: string) => {
  return jwt.verify(token, JWT_SECRET, {
    issuer: jwtIssuer,
  });
};
