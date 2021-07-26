// import ApiError from '../helpers/ApiError';
import ApiError from '../helpers/ApiError';
import Animes from '../models/animes';
import AnimeRepository from '../repositories/animesRepository';

class StreamingService {
    animeRepository: AnimeRepository;

    constructor() {
        this.animeRepository = new AnimeRepository();
    }

    async checkData(animeId: number, episode: number): Promise<Animes> {
        const anime = await this.animeRepository.getAnime(animeId);

        if (episode > anime.numberOfEpisodes) {
            throw new ApiError('Provided episode does not exist', 404);
        }
        return anime;
    }
}

export default StreamingService;
