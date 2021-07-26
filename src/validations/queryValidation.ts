import animesDataVerify from './validationsFiles/animesValidations';
import episodeDataVerify from './validationsFiles/episodeValidations';
// import tagsDataVerify from './tagsValidations';

export default {
    // Rota de animes
    '/animes/get': animesDataVerify.getAnimesValidationQuery,
    // Rota de episódios
    '/:anime/episodes/get': episodeDataVerify.getEpisodeValidationQuery,
    // Rota de tags
};
