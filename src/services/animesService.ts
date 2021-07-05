import ApiError from "../helpers/ApiError";
import Animes from "../models/animes";
import Tags from "../models/tags";
import AnimeRepository from "../repositories/animesRepository";
import TagsRepository from "../repositories/tagsRepository";
import { IAnime } from "../types/anime";
import fs from 'fs';
import util from 'util';
const mkdirPromise = util.promisify(fs.mkdir);

class AnimeService {
    async create(animeData: IAnime): Promise<Animes | undefined> {
        try {
            if (await new AnimeRepository().checkWithNameIfAnimeExists(animeData.name)) {
                throw new ApiError('Anime already exists', 400);
            };

            const tags: Tags[] = await new TagsRepository().findAllTags();
            const tagsToAdd = [];
            for (let tag of tags) {
                animeData.tags.includes(tag.nameTag) ? tagsToAdd.push(tag.id) : false;
            };

            const newAnime = await new AnimeRepository().create(animeData);
            await newAnime?.$add('tags', tagsToAdd);
            return newAnime;
        } catch (error) {
            throw new ApiError(error.message, error.status);
        };
    };

    async getAnimes(offset: number, limit: number) {
        try {
            if (offset == 1) offset = 0;
            const animesFromDb = await Animes.findAndCountAll({
                where: { actived: true },
                offset: offset,
                limit: limit
            });
            return animesFromDb.rows;
        } catch (error) {
            console.log(error);
            throw new ApiError('Internal error when searching for animes', 500);
        }
    };

    async updateAnime() {

    };

    async delete(animeData: number): Promise<void> {
        try {
            new AnimeRepository().deleteAnime(animeData);
        } catch (error) {
            throw new ApiError(error.message, error.status);
        };
    };
    async createAnimeDirectory(category: string, animeName: string) {
        try {
            if (!['josei', 'kodomo', 'seinen', 'shoujo', 'shounen'].includes(category)) {
                throw new ApiError('Category entered does not exist', 400);
            };
            const path = process.cwd() + `/animes/${category}/${animeName}`;
            await mkdirPromise(path);
            await mkdirPromise(`${path}/episodes`);
            return path + '/';
        } catch (error) {
            throw Error(error.message || '');
        };
    };
};


export default AnimeService;