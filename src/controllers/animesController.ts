import { Request, Response, NextFunction } from 'express';
import ApiError from '../helpers/ApiError';
import AnimeService from '../services/animesService';
// import logger from "../logs/logger";

class Animes {
    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        const newAnime = await new AnimeService().create(req.body);
        res.status(201).json({
            message: `Anime ${req.body.name} created successfully`,
            id: newAnime.id,
        });
    }

    async read(req: Request, res: Response, next: NextFunction) {
        const offset = req.query.offset as unknown as number;
        const limit = req.query.limit as unknown as number;
        const animes = await new AnimeService().getAnimes(offset || 1, limit || 100);
        return res.status(200).json(animes);
    }

    async upload(req: Request, res: Response, next: NextFunction) {
        const idAnime = req.params.id as unknown as number;
        const animeUpdated = await new AnimeService().updateAnime(req.body, idAnime);
        if (!animeUpdated[0]) throw new ApiError('No fields were found. Check if the syntax is correct', 202);
        return res.status(204).json({ message: 'Fields successfully updated' });
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        const idAnime = req.params.id as unknown as number;
        await new AnimeService().delete(idAnime);
        return res.status(204).json({ message: 'Anime successfully deleted' });
    }
}

export default Animes;
