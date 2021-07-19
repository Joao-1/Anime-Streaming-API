import _ from 'lodash';
import { Schema } from 'joi';
import { Request, Response, NextFunction } from 'express';
import Schemas from '../validations';

const supportedMethods = ['post', 'put', 'delete '];

const validationOptions = {
    abortEarly: false,
};

// eslint-disable-next-line consistent-return
export default (req: Request, res: Response, next: NextFunction) => {
    const route = req.route.path;
    const method = req.method.toLowerCase();

    if (_.includes(supportedMethods, method) && _.has(Schemas, route)) {
        const schema: Schema = _.get(Schemas, route);
        if (schema) {
            const { error } = schema.validate(req.body, validationOptions);
            if (error) {
                return res.status(422).json({
                    status: 'failed',
                    error: {
                        details: _.map(error.details, ({ message, type }) => ({
                            message: message.replace(/['"]/g, ''),
                            type,
                        })),
                    },
                });
            }
            next();
        }
        next();
    }
};
