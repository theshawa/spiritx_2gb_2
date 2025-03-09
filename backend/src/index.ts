import cors from "cors";
import express from "express";
import { errorMiddleware } from "./middlewares/error";

import "express-async-errors";

import { associateModels } from "./models/associations";

import cookeiParser from "cookie-parser";
import { router } from "./router";

associateModels();

const app = express();
app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));

app.use(express.json());
app.use(cookeiParser());

app.use(router);

app.use(errorMiddleware);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
