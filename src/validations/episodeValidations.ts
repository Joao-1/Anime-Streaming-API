import Joi from 'joi';

const createEpisodeValidation = Joi.object({
    animeId: Joi.number().required(),
    // author: Joi.string().guid({ version: ['uuidv4'] }),
});

const getEpisodeValidationQuery = Joi.object({
    episodes: Joi.array().items(Joi.number().allow('')),
});

const putEpisodeValidationQuery = Joi.object({
    episode: Joi.number().required(),
});

const deleteEpisodeValidationQuery = Joi.object({
    episodes: Joi.array().items(Joi.number()),
});

export default {
    createEpisodeValidation,
    getEpisodeValidationQuery,
    putEpisodeValidationQuery,
    deleteEpisodeValidationQuery,
};
