import { Router } from "express";
import {
  createPlayerHandler,
  createPlayerHandlerBodySchema,
} from "./handlers/create-player";
import { getAccessTokenHandler } from "./handlers/get-access-token";
import { getCategoriesHandler } from "./handlers/get-categories";
import { getPlayerHandler } from "./handlers/get-player";
import { getPlayersHandler } from "./handlers/get-players";
import { getTournamentSummaryHandler } from "./handlers/get-tournament-summary";
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
router.get(
  "/categories",
  authMiddleware(["user", "admin"]),
  getCategoriesHandler
);
router.post(
  "/new-player",
  authMiddleware(["admin"]),
  bodyValidatorMiddleware(createPlayerHandlerBodySchema),
  createPlayerHandler
);

router.get(
  "/tournament-summary",
  authMiddleware(["admin"]),
  getTournamentSummaryHandler
);
