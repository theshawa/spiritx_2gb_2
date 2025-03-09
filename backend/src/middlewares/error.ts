import { ErrorRequestHandler } from "express";

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  if (err.status) {
    res.status(err.status).json({
      message: err.message,
      status: err.status,
      data: err.data || null,
    });
    return;
  }
  res.status(500).json("Internal server error");
};
