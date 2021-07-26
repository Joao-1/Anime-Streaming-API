import animesDataVerify from './validationsFiles/animesValidations';
import episodeDataVerify from './validationsFiles/episodeValidations';
// import tagsDataVerify from './validationsFiles/tagsValidations';

export default {
    // Rota de animes
    '/animes/put': animesDataVerify.putAnimesValidationParams,
    '/animes/delete': animesDataVerify.deleteAnimesValidationParams,
    // Rota de episódios
    '/:anime/episodes/post': episodeDataVerify.postEpisodeValidationParams,
    '/:anime/episodes/get': episodeDataVerify.getEpisodeValidationParams,
    '/:anime/episodes/:id/put': episodeDataVerify.putEpisodeValidationParams,
    '/:anime/episodes/:id/delete': episodeDataVerify.deleteEpisodeValidationParams,
    // Rota de tags'
};
