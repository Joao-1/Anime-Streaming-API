import Joi from 'joi';

const postValidationBody = Joi.object({
    name: Joi.string().replace(/( )+/g, ' ').required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
    author: Joi.string().allow(''),
    studio: Joi.string().allow(''),
    director: Joi.string().allow(''),
    realeaseYear: Joi.string().allow(''),
    tags: Joi.string().allow(),
});

const getAnimesValidationQuery = Joi.object({
    offset: Joi.number().integer().min(1),
    limit: Joi.number().integer(),
});

const putAnimesValidationParams = Joi.object({
    id: Joi.number().integer().required(),
});

const deleteAnimesValidationParams = Joi.object({
    id: Joi.number().integer().required(),
});

export default {
    postValidationBody,
    getAnimesValidationQuery,
    putAnimesValidationParams,
    deleteAnimesValidationParams,
};
