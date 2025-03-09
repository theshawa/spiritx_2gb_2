import { RequestHandler } from "express";
import { z } from "zod";
import { AppError } from "../lib/error";

export const bodyValidatorMiddleware =
  (schema: z.AnyZodObject | z.ZodOptional<z.AnyZodObject>): RequestHandler =>
  (req, res, next) => {
    try {
      schema.parse(req.body);
    } catch (err) {
      if (err instanceof z.ZodError) {
        err = err.issues.map((e) => ({ path: e.path[0], message: e.message }));
      }
      throw new AppError("invalid body", 400, {
        errors: err,
      });
    }

    next();
  };
