import { IEpisode } from '../types/episode';
import ApiError from '../helpers/ApiError';
import AnimeEpisodes from '../models/animeEpisodes';

class EpisodeAnimeRepository {
    async create(episodeData: IEpisode): Promise<AnimeEpisodes> {
        const episode = await AnimeEpisodes.create({
            AnimeId: episodeData.AnimeId,
            name: episodeData.name,
            numberEpisode: episodeData.numberEpisode,
            postAuthor: episodeData.postAuthor,
        }).catch(() => {
            throw new ApiError('Error adding new episode', 500);
        });
        return episode;
    }
}

export default EpisodeAnimeRepository;
