import { Router } from "express";
import { getAccessTokenHandler } from "./handlers/get-access-token";
import { getPlayerHandler } from "./handlers/get-player";
import { getPlayersHandler } from "./handlers/get-players";
import { loginHandler, loginHandlerBodySchema } from "./handlers/login";
import { logoutHandler } from "./handlers/logout";
import {
  registerHandler,
  registerHandlerBodySchema,
} from "./handlers/register";
import { authMiddleware } from "./middlewares/auth-middleware";
import { bodyValidatorMiddleware } from "./middlewares/body-validator";

export const router = Router();

router.get("/ping", (req, res) => {
  res.json("pong");
});

router.post(
  "/login",
  bodyValidatorMiddleware(loginHandlerBodySchema),
  loginHandler
);
router.post(
  "/register",
  bodyValidatorMiddleware(registerHandlerBodySchema),
  registerHandler
);
router.get("/access-token", getAccessTokenHandler);
router.post("/logout", authMiddleware(["user", "admin"]), logoutHandler);

router.get("/players", authMiddleware(["user", "admin"]), getPlayersHandler);
router.get("/players/:id", authMiddleware(["user", "admin"]), getPlayerHandler);
