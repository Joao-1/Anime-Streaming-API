import { NextFunction, Request, Response } from 'express';
import config from '../config/config';
import ApiError from '../helpers/ApiError';
import logger from '../logs/logger';

const errorMiddleware = (error: ApiError, request: Request, response: Response, next: NextFunction) => {
    const { status } = error;
    const message = error.message || 'Something went wrong';
    logger.error(error.message);
    response.status(status).json({
        status,
        message,
    });

    if (config.app.running) {
        logger.error(error.message);
    } else {
        logger.error(error.stack);
    }
};

export default errorMiddleware;
