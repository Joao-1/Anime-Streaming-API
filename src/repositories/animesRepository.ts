import ApiError from '../helpers/ApiError';
import Animes from '../models/animes';
import { IAnime } from '../types/anime';

class AnimeRepository {
    async create(animeData: IAnime): Promise<Animes> {
        try {
            const anime = await Animes.create({
                name: animeData.name,
                description: animeData.description,
                category: animeData.category,
                studio: animeData?.studio,
                realeaseYear: animeData?.realeaseYear,
                status: animeData?.status,
            });
            return anime;
        } catch (error) {
            throw new ApiError('Error registering anime', 500);
        }
    }

    async updateAnime(updateData: Record<string, string>, animeId: string | number) {
        try {
            const anime = await Animes.update(updateData, { where: { id: animeId } });
            return anime;
        } catch (error) {
            console.log(error);
            throw new ApiError('Error updating anime', 500);
        }
    }

    async deleteAnime(animeId: string | number) {
        try {
            await Animes.destroy({
                where: {
                    id: animeId,
                },
            });
        } catch (error) {
            throw new ApiError('Error deleting anime in database', 500);
        }
    }

    async checkWithIdIfAnimeExists(animeId: string | number): Promise<Animes | false> {
        try {
            const animeExist = await Animes.findOne({ where: { id: animeId } });
            return animeExist || false;
        } catch (error) {
            console.log(error);
            throw new ApiError('Error looking for an anime by id', 500);
        }
    }

    async checkWithNameIfAnimeExists(animeName: string): Promise<Animes | false> {
        try {
            const animeExist = await Animes.findOne({ where: { name: animeName } });
            return animeExist || false;
        } catch (error) {
            console.log(error);
            throw new ApiError('error checking if an anime exists by id', 500);
        }
    }
}

export default AnimeRepository;
