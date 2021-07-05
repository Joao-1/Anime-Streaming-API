import { Request, Response, NextFunction } from "express";
import ApiError from '../helpers/ApiError';
import logger from "../services/logger";

function errorMiddleware(error: ApiError, request: Request, response: Response, next: NextFunction) {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    logger.error({
        message,
        status
    });
    response.status(status).json({ status, message, })
};

export default errorMiddleware;