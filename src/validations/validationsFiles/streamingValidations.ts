import Joi from 'joi';

const getStreamingValidationParams = Joi.object({
    anime: Joi.number().integer().positive().required(),
    episode: Joi.number().integer().positive().required(),
});

export default getStreamingValidationParams;
