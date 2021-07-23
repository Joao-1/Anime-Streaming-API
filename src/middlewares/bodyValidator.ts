import _ from 'lodash';
import { Schema } from 'joi';
import { Request, Response, NextFunction } from 'express';
import Schemas from '../validations';

const supportedMethods = ['post', 'put', 'delete '];

// eslint-disable-next-line consistent-return
export default (req: Request, res: Response, next: NextFunction) => {
    const method = req.method.toLowerCase();
    const route = `${req.route.path}/${method}`;
    console.log(route);

    if (_.includes(supportedMethods, method) && _.has(Schemas, route)) {
        const schema: Schema = _.get(Schemas, route);
        if (schema) {
            const { error } = schema.validate(req.body, { abortEarly: false });
            if (error) {
                return res.status(422).json({
                    status: 'failed',
                    error: {
                        details: _.map(error.details, ({ message, type }) => ({
                            message: `Body:${message.replace(/['"]/g, '')}`,
                            type,
                        })),
                    },
                });
            }
        }
    }
    next();
};
