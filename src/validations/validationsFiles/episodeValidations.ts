import Joi from 'joi';

const postEpisodeValidationBody = Joi.object({
    anime: Joi.number().required(),
    // author: Joi.string().guid({ version: ['uuidv4'] }),
});

const getEpisodeValidationQuery = Joi.object({
    episodes: Joi.array().items(Joi.number().allow('')),
});

const postEpisodeValidationParams = Joi.object({
    anime: Joi.number().required(),
});

const getEpisodeValidationParams = Joi.object({
    anime: Joi.number().required(),
});

const putEpisodeValidationParams = Joi.object({
    id: Joi.number().required(),
});

const deleteEpisodeValidationParams = Joi.object({
    id: Joi.array().items(Joi.number()),
});

export default {
    postEpisodeValidationBody,
    postEpisodeValidationParams,
    getEpisodeValidationParams,
    getEpisodeValidationQuery,
    putEpisodeValidationParams,
    deleteEpisodeValidationParams,
};
