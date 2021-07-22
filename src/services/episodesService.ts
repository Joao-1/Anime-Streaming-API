import ApiError from '../helpers/ApiError';
import AnimeRepository from '../repositories/animesRepository';
import AnimeEpisodesRepository from '../repositories/animeEpisodesRepository';

class EpisodesServices {
    animeRepository: AnimeRepository;

    animeEpisodeRepository: AnimeEpisodesRepository;

    constructor() {
        this.animeRepository = new AnimeRepository();
        this.animeEpisodeRepository = new AnimeEpisodesRepository();
    }

    async create(episodeData: Record<string, string>) {
        const anime = await this.animeRepository.checkWithIdIfAnimeExists(episodeData.anime);
        if (!anime) {
            throw new ApiError('There is no anime with the given id', 400);
        }
        await this.animeEpisodeRepository.create({
            AnimeId: anime.id,
            name: episodeData.name,
            numberEpisode: (anime.numberOfEpisodes += 1),
            postAuthor: episodeData.postAuthor,
        });

        await anime.save().catch(() => {
            throw new ApiError('Error saving information about the new episode in its respective anime.');
        });
        return anime;
    }

    // async getEp() { }

    // async updateEp() { }

    // async delete() { }
}

export default EpisodesServices;
