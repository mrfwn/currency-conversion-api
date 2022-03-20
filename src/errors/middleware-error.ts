import AppError from "./AppError";
import { Response, Request, NextFunction } from "express";

export const middlewareError = (err: Error, request: Request, response: Response, _: NextFunction) => {

  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
}
