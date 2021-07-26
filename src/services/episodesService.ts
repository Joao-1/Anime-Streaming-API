import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { IEpisode } from '../types/episode.d';
import ApiError from '../helpers/ApiError';
import AnimeRepository from '../repositories/animesRepository';
import AnimeEpisodesRepository from '../repositories/animeEpisodesRepository';
import moveFiles from '../helpers/moveFiles';
import AnimeEpisodes from '../models/animeEpisodes';

class EpisodesServices {
    animeRepository: AnimeRepository;

    animeEpisodeRepository: AnimeEpisodesRepository;

    constructor() {
        this.animeRepository = new AnimeRepository();
        this.animeEpisodeRepository = new AnimeEpisodesRepository();
    }

    async create(episodeData: IEpisode, pathToEp: string): Promise<AnimeEpisodes> {
        const anime = await this.animeRepository.getAnime(episodeData.animeId);
        const newEpisode = await this.animeEpisodeRepository.create({
            animeId: anime.id,
            name: episodeData.name,
            episode: (anime.numberOfEpisodes += 1),
            postAuthor: episodeData.postAuthor,
        });

        await anime.save().catch(() => {
            throw new ApiError('Error saving information about the new episode in its respective anime.');
        });

        const newPath = `${process.cwd()}/animes/${anime.category}/${anime.id}/episodes/`;
        await moveFiles(pathToEp, `${newPath}episodes${anime.numberOfEpisodes}${path.extname(pathToEp)}`).catch(() => {
            throw new ApiError('Error moving new episode to anime directory');
        });

        return newEpisode;
    }

    async getEp(animeId: number, episodes: number[] | undefined) {
        const anime = await this.animeRepository.getAnime(animeId);

        let episodesDb: AnimeEpisodes[];
        if (episodes) {
            episodesDb = await this.animeEpisodeRepository.getWithId(anime.id, episodes);
            return episodesDb;
        }
        episodesDb = await this.animeEpisodeRepository.getAll(anime.id);
        return episodesDb;
    }

    async updateEp(updateData: Record<string, string>, animeId: number, episode: number | string) {
        const anime = await this.animeRepository.getAnime(animeId);

        const episodeDb = await this.animeEpisodeRepository.getWithId(anime.id, episode);
        if (!episodeDb) {
            throw new ApiError('Episode doesnt exist', 400);
        }

        const epUpdated = await this.animeEpisodeRepository.updateEp(updateData, anime.id, episodeDb[0].episode);
        return epUpdated;
    }

    async delete(animeId: number, episode: number) {
        const anime = await this.animeRepository.getAnime(animeId);
        const episodeDb = await this.animeEpisodeRepository.checkIfEpisodeExists(anime.id, episode);

        await this.animeEpisodeRepository.deleteEp(anime.id, episodeDb.episode);
        // eslint-disable-next-line no-unused-expressions
        anime.numberOfEpisodes - 1;
        await anime.save();

        await promisify(fs.unlink)(
            `${process.cwd()}/animes/${anime.category}/${anime.id}/episodes/episodes${episodeDb.episode}.mp4`
        ).catch(() => {
            throw new ApiError(
                'The anime instance in the database was successfully deleted, but an error occurred when trying to delete the episode video file'
            );
        });
    }
}

export default EpisodesServices;
