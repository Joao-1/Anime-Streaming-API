import Joi from 'joi';

const createValidation = Joi.object({
    name: Joi.string().replace(/( )+/g, ' ').required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
    author: Joi.string().allow(''),
    studio: Joi.string().allow(''),
    director: Joi.string().allow(''),
    realeaseYear: Joi.string().allow(''),
    tags: Joi.string().allow(),
});

export default { createValidation };
