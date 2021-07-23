import animeDataVerify from './animesValidations';
import episodeDataVerify from './episodeValidations';
import tagsDataVerify from './tagsValidations';

export default {
    // Rota de animes
    '/animes/post': animeDataVerify.createValidation,
    // Rota de episódios
    '/:anime/episodes/post': episodeDataVerify.createEpisodeValidation,
    '/:anime/episodes/get': episodeDataVerify.getEpisodeValidationQuery,
    '/:anime/episodes/put': episodeDataVerify.putEpisodeValidationQuery,
    '/:anime/episodes/delete': episodeDataVerify.deleteEpisodeValidationQuery,
    // Rota de tags
    '/tags/post': tagsDataVerify.createTagValidation,
};
