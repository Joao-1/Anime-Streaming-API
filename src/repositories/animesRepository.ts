import ApiError from "../helpers/ApiError";
import Animes from "../models/animes";
import { IAnime } from "../types/anime";

class AnimeRepository {
    async create(animeData: IAnime): Promise<Animes | undefined> {
        try {
            const anime = await Animes.create({
                name: animeData.name,
                description: animeData.description,
                category: animeData.category,
                studio: animeData?.studio,
                realeaseYear: animeData?.realeaseYear,
                status: animeData?.status
            });
            return anime;
        } catch (error) {
            new ApiError('Error registering anime', 500);
        };
    };

    async checkWithIdIfAnimeExists(animeId: string): Promise<Animes | false> {
        try {
            const animeExist = await Animes.findOne({ where: { id: animeId } });
            return animeExist ? animeExist : false
        } catch (error) {
            console.log(error);
            throw new ApiError('Error looking for an anime by id', 500);
        }
    };
    async checkWithNameIfAnimeExists(animeName: string): Promise<Animes | false> {
        const animeExist = await Animes.findOne({ where: { name: animeName } });
        return animeExist ? animeExist : false
    };

    async deleteAnime(animeId: number) {
        try {
            await Animes.destroy({
                where: {
                    id: animeId,
                }
            });
        } catch (error) {
            throw new ApiError('Error deleting anime in database', 500);
        };
    };
};

export default AnimeRepository;