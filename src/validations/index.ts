import animeDataVerify from './animesValidations';
import episodeDataVerify from './episodeValidations';
import tagsDataVerify from './tagsValidations';

export default {
    // Rota de animes
    '/animes/post': animeDataVerify.createValidation,
    // Rota de episódios
    '/:anime/episodes/post': episodeDataVerify.createEpisodeValidation,
    // Rota de tags
    '/tags/post': tagsDataVerify.createTagValidation,
};
