import { Request, Response, NextFunction } from 'express';
import ApiError from '../helpers/ApiError';
import multer from 'multer';
import path from 'path';
import EpisodesServices from '../services/episodesService';
import moveFiles from '../helpers/moveFiles';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.cwd() + "/uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage }).single('episode');

class UploadEpAnime {
    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        upload(req, res, async () => {
            if (!req.file?.path) return next(new ApiError(`Anime video file was not provided`, 412));
            if (req.file?.mimetype !== 'video/mp4') return next(new ApiError('Unsupported video type', 406));

            const { name, postAuthor } = req.body;

            try {
                const anime = await new EpisodesServices().create({
                    anime: req.params.animes,
                    name: name,
                    postAuthor: postAuthor || 1
                });
                //  pathAnime + nameFormated + 'Poster' + path.extname(req.file.path)
                const newPath = process.cwd() + `/animes/${anime.category}/${anime.name.toLowerCase().replace(/\s/g, '_')}/episodes/`
                console.log(newPath + `episodes${anime.numberOfEpisodes}` + path.extname(req.file.path));
                await moveFiles(req.file.path, newPath + `episodes${anime.numberOfEpisodes}` + path.extname(req.file.path));
                return res.status(201).json('Ep adicionado com sucesso porra');
            } catch (error) {
                return next(new ApiError(error.message, error.status));
            };
        });
    };

    async read(req: Request, res: Response, next: NextFunction): Promise<void> { };
    async upload(req: Request, res: Response, next: NextFunction): Promise<void> { };
    async delete(req: Request, res: Response, next: NextFunction): Promise<void> { };
};

export default UploadEpAnime;
