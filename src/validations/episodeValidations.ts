import Joi from 'joi';

const createEpisodeValidation = Joi.object({
    animeId: Joi.number().required(),
    // author: Joi.string().guid({ version: ['uuidv4'] }),
});

export default { createEpisodeValidation };
