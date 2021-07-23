import { Op } from 'sequelize';
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

    async getWithId(animeId: number, episodes: number[] | number | string) {
        const episodesDb = await AnimeEpisodes.findAll({
            where: { [Op.and]: [{ AnimeId: animeId }, { numberEpisode: episodes }] },
        }).catch(() => {
            throw new ApiError('Error when trying to search for specific episodes');
        });
        return episodesDb;
    }

    async getAll(animeId: number) {
        const episodesDb = await AnimeEpisodes.findAll({ where: { AnimeId: animeId } }).catch(() => {
            throw new ApiError('Error trying to find all episodes');
        });
        return episodesDb;
    }

    async updateEp(
        updateData: Record<string, string>,
        animeId: number,
        episode: number
    ): Promise<[number, AnimeEpisodes[]]> {
        const anime = await AnimeEpisodes.update(updateData, {
            where: { [Op.and]: [{ AnimeId: animeId }, { numberEpisode: episode }] },
        }).catch(() => {
            throw new ApiError('Error updating an episode in the database', 500);
        });
        return anime;
    }

    async deleteEp(animeId: number, episode: number) {
        await AnimeEpisodes.destroy({ where: { [Op.and]: [{ AnimeId: animeId }, { numberEpisode: episode }] } }).catch(
            () => {
                throw new ApiError('Error deleting anime in database');
            }
        );
    }

    async checkIfEpisodeExists(animeId: string | number, episode: number | string): Promise<AnimeEpisodes | null> {
        const epExist = await AnimeEpisodes.findOne({
            where: { [Op.and]: [{ AnimeId: animeId }, { numberEpisode: episode }] },
        }).catch(() => {
            throw new ApiError('Error looking for a new anime by id in database', 500);
        });
        return epExist;
    }
}

export default EpisodeAnimeRepository;
