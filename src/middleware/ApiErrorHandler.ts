import { NextFunction, Request, Response } from "express";
import ApiError from "../helpers/ApiError";
import logger from "../logs/logger";

const errorMiddleware = (error: ApiError, request: Request, response: Response, next: NextFunction) => {
  const { status } = error;
  const message = error.message || "Something went wrong";
  logger.error(message);
  response.status(status).json({
    status,
    message,
  });
};

export default errorMiddleware;
