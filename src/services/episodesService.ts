import ApiError from '../helpers/ApiError';
import AnimeRepository from '../repositories/animesRepository';
import AnimeEpisodesRepository from '../repositories/animeEpisodesRepository';

class EpisodesServices {
    async create(episodeData: Record<string, string>) {
        try {
            const anime = await new AnimeRepository().checkWithIdIfAnimeExists(episodeData.anime);
            if (!anime) {
                throw new ApiError('There is no anime with the given id', 400);
            }
            await new AnimeEpisodesRepository().create({
                AnimeId: anime.id,
                name: episodeData.name,
                numberEpisode: (anime.numberOfEpisodes += 1),
                postAuthor: episodeData.postAuthor,
            });

            await anime.save();
            return anime;
        } catch (error) {
            throw new ApiError(error.message, error.status);
        }
    }

    // async getEp() { }

    // async updateEp() { }

    // async delete() { }
}

export default EpisodesServices;
