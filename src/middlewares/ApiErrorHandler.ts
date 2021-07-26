import { NextFunction, Request, Response } from 'express';
import config from '../config/config';
import ApiError from '../helpers/ApiError';
import logger from '../logs/logger';

const errorMiddleware = (error: ApiError, request: Request, response: Response, next: NextFunction) => {
    const { status } = error;
    let { message } = error;
    logger.error(error.message);

    if (status === 500 || status === undefined) {
        message = 'Internal Server Error';
    }

    response.status(status || 500).json({
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
