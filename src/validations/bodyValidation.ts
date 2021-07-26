import animesDataVerify from './validationsFiles/animesValidations';
// import episodeDataVerify from './validationsFiles/episodeValidations';
import tagsDataVerify from './validationsFiles/tagsValidations';

export default {
    // Rota de animes
    '/animes/post': animesDataVerify.postValidationBody,
    // Rota de episódios
    // '/:anime/episodes/post': episodeDataVerify.postEpisodeValidationBody,
    // Rota de tags
    '/tags/post': tagsDataVerify.postTagValidationBody,
};
