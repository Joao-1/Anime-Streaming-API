import { Request, Response, NextFunction } from 'express';
import ApiError from '../helpers/ApiError';
import AnimesService from '../services/animesService';
// import logger from "../logs/logger";

class UploadAnime {
    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const anime = await new AnimesService().create(req.body);
            res.status(201).json({
                message: `Anime ${req.body.name} created successfully`,
                id: anime?.id,
            });
        } catch (error) {
            next(new ApiError(error.message, error.status));
        }
    }

    async read(req: Request, res: Response, next: NextFunction) {
        const offset: number | undefined = parseInt(req.query.offset?.toString() || '1', 10);
        const limit: number | undefined = parseInt(req.query.limit?.toString() || '100', 10);

        if (!offset || !limit) return next(new ApiError('The paging parameters must be numbers', 400));

        try {
            const animes = await new AnimesService().getAnimes(offset, limit);
            return res.status(200).json(animes);
        } catch (error) {
            return next(new ApiError(error.message, error.status));
        }
    }

    async upload(req: Request, res: Response, next: NextFunction) {
        const idAnime = req.params.id;
        if (!idAnime) return next(new ApiError('Id not provied', 422));
        try {
            const animeUpdated = await new AnimesService().updateAnime(req.body, idAnime);
            if (!animeUpdated[0]) next(new ApiError('No fields were found. Check if the syntax is correct', 202));
            return res.status(200).json({ message: 'Fields successfully updated' });
        } catch (error) {
            return next(new ApiError(error.message, error.status));
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        const idAnime = req.params.id;
        if (!idAnime) return next(new ApiError('Id not provied', 400));
        try {
            await new AnimesService().delete(idAnime);
            return res.status(200).json({ message: 'Anime successfully deleted' });
        } catch (error) {
            return next(new ApiError(error.message, error.status));
        }
    }
}

export default UploadAnime;
