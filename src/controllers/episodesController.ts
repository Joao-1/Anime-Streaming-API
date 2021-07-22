import { Request, Response, NextFunction } from 'express';
import path from 'path';
import ApiError from '../helpers/ApiError';
import EpisodesServices from '../services/episodesService';
import moveFiles from '../helpers/moveFiles';

class UploadEpAnime {
    // eslint-disable-next-line consistent-return
    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { name, postAuthor } = req.body;
        // VERIFICAR SE ESSE MEMBRO TEM PERMISSAO DE FAZER ISSO
        const anime = await new EpisodesServices().create({
            anime: req.params.anime,
            name,
            postAuthor: postAuthor || 1,
        });

        const newPath = `${process.cwd()}/animes/${anime.category}/${anime.id}/episodes/`;
        await moveFiles(
            req.file!.path,
            `${newPath}episodes${anime.numberOfEpisodes}${path.extname(req.file!.path)}`
        ).catch(() => {
            throw new ApiError('Error moving new episode to anime directory');
        });
        res.status(201).json('Ep adicionado com sucesso porra');
    }

    // async read(req: Request, res: Response, next: NextFunction): Promise<void> { }

    // async upload(
    //   req: Request,
    //   res: Response,
    //   next: NextFunction
    // ): Promise<void> { }

    // async delete(
    //   req: Request,
    //   res: Response,
    //   next: NextFunction
    // ): Promise<void> { }
}

export default UploadEpAnime;
