import _ from 'lodash';
import { Schema } from 'joi';
import { Request, Response, NextFunction } from 'express';
import Schemas from '../validations/queryValidation';

const supportedMethods = ['get', 'put', 'delete'];

// eslint-disable-next-line consistent-return
export default (req: Request, res: Response, next: NextFunction) => {
    const method = req.method.toLowerCase();
    const route = `${req.route.path}/${method}`;
    if (_.includes(supportedMethods, method) && _.has(Schemas, route)) {
        const schema: Schema = _.get(Schemas, route);
        if (schema) {
            const { error } = schema.validate(req.query, { abortEarly: false });
            if (error) {
                return res.status(422).json({
                    status: 'failed',
                    error: {
                        details: _.map(error.details, ({ message, type }) => ({
                            message: `Query Params:${message.replace(/['"]/g, '')}`,
                            type,
                        })),
                    },
                });
            }
        }
    }
    next();
};
