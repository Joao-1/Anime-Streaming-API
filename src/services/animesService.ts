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
    async create(animeData: IAnime): Promise<Animes | undefined> {
        try {
            console.log(animeData);
            if (await new AnimeRepository().checkWithNameIfAnimeExists(animeData.name)) {
                throw new ApiError('Anime already exists', 400);
            }

            if (!['josei', 'kodomo', 'seinen', 'shoujo', 'shounen'].includes(animeData.category)) {
                throw new ApiError('Category entered does not exist', 400);
            }

            const tags: Tags[] = await new TagsRepository().findAllTags();
            const tagsToAdd = [];
            for (const tag of tags) {
                if (animeData.tags.includes(tag.nameTag)) tagsToAdd.push(tag.id);
            }

            const newAnime = await new AnimeRepository().create(animeData);
            await newAnime.$add('tags', tagsToAdd).catch((e) => {
                newAnime.destroy();
                throw new ApiError(e.message);
            });

            await this.createAnimeDirectory(newAnime.category.toLowerCase(), newAnime.name, newAnime.id);
            // await moveFiles(animeData.image, path);
            return newAnime;
        } catch (error) {
            throw new ApiError(error.message, error?.status);
        }
    }

    async getAnimes(offset: number, limit: number) {
        try {
            if (offset === 1) offset = 0;
            const animesFromDb = await Animes.findAndCountAll({
                where: { actived: true },
                offset,
                limit,
            });
            return animesFromDb.rows;
        } catch (error) {
            throw new ApiError('Internal error when searching for animes', 500);
        }
    }

    async updateAnime(updateData: Record<string, string>, animeId: string | number) {
        try {
            if (!(await new AnimeRepository().checkWithIdIfAnimeExists(animeId))) {
                throw new ApiError('Anime doesnt exist', 400);
            }
            const animeUpdated = await new AnimeRepository().updateAnime(updateData, animeId);
            return animeUpdated;
        } catch (error) {
            throw new ApiError(error.message, 500);
        }
    }

    async delete(animeData: string | number): Promise<void> {
        try {
            new AnimeRepository().deleteAnime(animeData);
        } catch (error) {
            throw new ApiError(error.message, error.status);
        }
    }

    async createAnimeDirectory(category: string, animeName: string, animeId: number) {
        try {
            const path = `${process.cwd()}/animes/${category}/${animeId}`;
            await mkdirPromise(path);
            await mkdirPromise(`${path}/episodes`);
            return `${path}/`;
        } catch (error) {
            console.log(error);
            await this.delete(animeId);
            throw new ApiError(error.message, error.code);
        }
    }
}

export default AnimeService;
