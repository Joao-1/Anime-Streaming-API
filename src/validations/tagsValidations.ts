import Joi from 'joi';

const createTagValidation = Joi.object({
    tag: Joi.string().required(),
    // author: Joi.string().guid({ version: ['uuidv4'] }),
});

export default { createTagValidation };
