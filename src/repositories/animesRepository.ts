import ApiError from '../helpers/ApiError';
import Animes from '../models/animes';
import { IAnime } from '../types/anime';

class AnimeRepository {
    async create(animeData: IAnime): Promise<Animes> {
        const anime = await Animes.create({
            name: animeData.name,
            description: animeData.description,
            category: animeData.category,
            studio: animeData?.studio,
            realeaseYear: animeData?.realeaseYear,
            status: animeData?.status,
        }).catch(() => {
            throw new ApiError('Error inserting a new anime into the database', 500);
        });
        return anime;
    }

    async updateAnime(updateData: Record<string, string>, animeId: number): Promise<[number, Animes[]]> {
        const anime = await Animes.update(updateData, { where: { id: animeId } }).catch(() => {
            throw new ApiError('Error updating an anime in the database', 500);
        });
        return anime;
    }

    async deleteAnime(animeId: number): Promise<void> {
        await Animes.destroy({
            where: {
                id: animeId,
            },
        }).catch(() => {
            throw new ApiError('Error deleting anime in database', 500);
        });
    }

    async checkWithIdIfAnimeExists(animeId: string | number): Promise<Animes | null> {
        const animeExist = await Animes.findOne({ where: { id: animeId } }).catch(() => {
            throw new ApiError('Error looking for a new anime by id in database', 500);
        });
        return animeExist;
    }

    async checkWithNameIfAnimeExists(animeName: string): Promise<Animes | false> {
        const animeExist = await Animes.findOne({ where: { name: animeName } }).catch(() => {
            throw new ApiError('Error checking if an anime exists by id in database', 500);
        });
        return animeExist || false;
    }

    async getWithPagination(offset: number, limit: number) {
        const animesFromDb = await Animes.findAndCountAll({
            where: { actived: true },
            offset,
            limit,
        }).catch(() => {
            throw new ApiError('Internal error when searching for animes', 500);
        });
        return animesFromDb.rows;
    }
}

export default AnimeRepository;
