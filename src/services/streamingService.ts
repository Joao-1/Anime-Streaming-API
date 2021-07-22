// import ApiError from '../helpers/ApiError';

import ApiError from '../helpers/ApiError';
import AnimeRepository from '../repositories/animesRepository';

class StreamingService {
    animeRepository: AnimeRepository;

    constructor() {
        this.animeRepository = new AnimeRepository();
    }

    async checkData(animeId: number, episode: number) {
        const animeInfo = await this.animeRepository.checkWithIdIfAnimeExists(animeId);

        if (!animeInfo) {
            throw new ApiError('Anime not found in database', 404);
        }

        if (episode > animeInfo.numberOfEpisodes) {
            throw new ApiError('Provided episode does not exist', 404);
        }
        return animeInfo;
    }
}

export default StreamingService;
