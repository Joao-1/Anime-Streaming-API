import { Request, Response, NextFunction } from 'express';
import ApiError from '../helpers/ApiError';
import verificationValues from '../helpers/verificationValues';
import multer from 'multer';
import path from 'path';
import AnimesServices from '../services/animesService';
import moveFiles from '../helpers/moveFiles';
import AnimeService from '../services/animesService';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.cwd() + "/uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage }).single('image');

class UploadAnime {
    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        upload(req, res, async () => {
            const valueNull = verificationValues(req.body, ['name', 'category', 'description', 'tags']);
            if (valueNull) return next(new ApiError(`${valueNull} not provided`, 412));
            console.log(req.file?.path)
            if (!req.file?.path) return next(new ApiError(`Image not provided`, 412));
            if (req.file?.mimetype !== 'image/png') return next(new ApiError('Unsupported image type', 406));

            let { name, description, category, author, studio, director, realeaseYear, tags } = req.body;
            name = name.replace(/( )+/g, " ");
            console.log(name);
            try {
                const anime = await new AnimesServices().create({
                    name,
                    description,
                    category,
                    author,
                    studio,
                    director,
                    realeaseYear,
                    tags: tags.split(",")
                });

                const nameFormated: string = name.toLowerCase().replace(/\s/g, '_');

                let pathAnime = await new AnimesServices().createAnimeDirectory(
                    category.toLowerCase(),
                    nameFormated,
                ).catch((error) => {
                    new AnimesServices().delete(anime!.id);
                    throw new ApiError(error.message || 'Error creating anime directory', 500);
                });

                await moveFiles(req.file.path, pathAnime + nameFormated + 'Poster' + path.extname(req.file.path));

                res.status(201).json({ message: `Anime ${name} created successfully`, id: anime?.id });
            } catch (error) {
                return next(new ApiError(error.message, error.status));
            };
        });
    };

    async read(req: Request, res: Response, next: NextFunction): Promise<void> {
        const offset: number | undefined = parseInt(req.query.offset?.toString() || '1');
        const limit: number | undefined = parseInt(req.query.limit?.toString() || '100');

        if (!offset || !limit) return next(new ApiError('The paging parameters must be numbers', 400));

        try {
            const animes = await new AnimeService().getAnimes(offset, limit);
            res.status(200).json(animes);
        } catch (error) {

        }
    };
    async upload(req: Request, res: Response, next: NextFunction): Promise<void> { };
    async delete(req: Request, res: Response, next: NextFunction): Promise<void> { };
};

export default UploadAnime;
