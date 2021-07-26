import Joi from 'joi';

const postTagValidationBody = Joi.object({
    name: Joi.string().required(),
    // author: Joi.string().guid({ version: ['uuidv4'] }),
});

const uploadTagValidationBody = Joi.object({
    name: Joi.string().required(),
});

export default { postTagValidationBody, uploadTagValidationBody };
