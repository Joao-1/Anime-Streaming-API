import Joi from 'joi';

const createEpisodeValidation = Joi.object({
    animeId: Joi.number().required(),
    // author: Joi.string().guid({ version: ['uuidv4'] }),
});

const getEpisodeValidationQuery = Joi.object({
    episodes: Joi.array().items(Joi.number().allow('')),
});

export default { createEpisodeValidation, getEpisodeValidationQuery };
