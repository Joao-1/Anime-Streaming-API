import fs from 'fs';
import util from 'util';
import ApiError from '../helpers/ApiError';
// import moveFiles from "../helpers/moveFiles";
import Animes from '../models/animes';
import Tags from '../models/tags';
import AnimeRepository from '../repositories/animesRepository';
import TagsRepository from '../repositories/tagsRepository';
import { IAnime } from '../types/anime';

const mkdirPromise = util.promisify(fs.mkdir);

class AnimeService {
    animeRepository: AnimeRepository;

    tagsRepository: TagsRepository;

    constructor() {
        this.animeRepository = new AnimeRepository();
        this.tagsRepository = new TagsRepository();
    }

    async create(animeData: IAnime): Promise<Animes> {
        if (await this.animeRepository.checkWithNameIfAnimeExists(animeData.name)) {
            throw new ApiError('Anime already exists', 400);
        }

        if (!['josei', 'kodomo', 'seinen', 'shoujo', 'shounen'].includes(animeData.category)) {
            throw new ApiError('Category entered does not exist', 400);
        }

        const tagsFromDb: Tags[] = await this.tagsRepository.findAllTags();
        const tagsToAdd = [];
        for (const tag of tagsFromDb) {
            if (animeData.tags.includes(tag.name)) tagsToAdd.push(tag.id);
        }

        const newAnime = await this.animeRepository.create(animeData);

        try {
            await newAnime.$add('tags', tagsToAdd);
            await this.createAnimeDirectory(newAnime.category.toLowerCase(), newAnime.name, newAnime.id);
            // await moveFiles(animeData.image, path);
        } catch (error) {
            await newAnime.destroy();
            throw new ApiError(error.message);
        }

        return newAnime;
    }

    async getAnimes(offset: number, limit: number) {
        if (offset === 1) offset = 0;
        const animes = this.animeRepository.getWithPagination(offset, limit);
        return animes;
    }

    async updateAnime(updateData: Record<string, string>, animeId: number) {
        const anime = await this.animeRepository.getAnime(animeId);
        const animeUpdated = await this.animeRepository.updateAnime(updateData, anime.id);
        return animeUpdated;
    }

    async delete(animeId: number): Promise<void> {
        const anime = await this.animeRepository.getAnime(animeId);
        const animeDeleted = this.animeRepository.deleteAnime(anime.id);
        return animeDeleted;
    }

    async createAnimeDirectory(category: string, animeName: string, animeId: number) {
        try {
            const path = `${process.cwd()}/animes/${category}/${animeId}`;
            await mkdirPromise(path);
            await mkdirPromise(`${path}/episodes`);
            return `${path}/`;
        } catch (error) {
            throw new ApiError('Internal error creating new anime file system');
        }
    }
}

export default AnimeService;
