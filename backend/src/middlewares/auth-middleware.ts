import { RequestHandler } from "express";
import { TokenData } from "../token-data";
import { verifyToken } from "../utils/jwt";

export const authMiddleware =
  (roles: string[]): RequestHandler =>
  async (req, res, next) => {
    try {
      const auth = req.headers.authorization;
      if (!auth) {
        res.status(403).send("Unauthorized");
        return;
      }

      const token = auth.split(" ")[1];
      if (!token) {
        res.status(403).send("Unauthorized");
        return;
      }

      const data = await verifyToken(token);
      if (!data) {
        res.status(403).send("Unauthorized");
        return;
      }

      const parsedData = TokenData.parse(data);
      if (!roles.includes(parsedData.role)) {
        res.status(403).send("Unauthorized");
        return;
      }

      res.locals.auth = parsedData;
      next();
    } catch (error) {
      res.status(403).send("Unauthorized");
    }
  };
