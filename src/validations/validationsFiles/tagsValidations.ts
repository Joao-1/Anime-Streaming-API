import Joi from 'joi';

const postTagValidationBody = Joi.object({
    name: Joi.string().required(),
    // author: Joi.string().guid({ version: ['uuidv4'] }),
});

export default { postTagValidationBody };
