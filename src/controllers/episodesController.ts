import { Request, Response, NextFunction } from 'express';
import ApiError from '../helpers/ApiError';
import EpisodesServices from '../services/episodesService';

class UploadEpAnime {
    // eslint-disable-next-line consistent-return
    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { name, postAuthor } = req.body;
        // Adicionar opção de poder ter episódio 0
        // VERIFICAR SE ESSE MEMBRO TEM PERMISSAO DE FAZER ISSO
        const episode = await new EpisodesServices().create(
            {
                anime: req.params.anime,
                name,
                postAuthor: postAuthor || 1,
            },
            req.file!.path
        );
        res.status(201).json({ status: 'sucess', episode });
    }

    async read(req: Request, res: Response, next: NextFunction): Promise<void> {
        const episodes = req.query.episodes as number[] | undefined;
        const { anime } = req.params;
        const eps = await new EpisodesServices().getEp(anime, episodes);
        res.json({ anime, episode: eps });
    }

    async upload(req: Request, res: Response, next: NextFunction): Promise<void> {
        const episode = req.query.episode as unknown as number;
        const anime = req.params.anime as unknown as number;
        const eps = await new EpisodesServices().updateEp(req.body, anime, episode);
        if (!eps[0]) throw new ApiError('No fields were found. Check if the syntax is correct', 202);
        res.status(200).json({ status: 'sucess', message: 'Episode updated successfully' });
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        const episodes = req.query.episodes as unknown as number;
        const { anime } = req.params;
        await new EpisodesServices().delete(anime, episodes);
        res.status(200).json({ status: 'sucess', message: 'Anime successfully deleted' });
    }
}

export default UploadEpAnime;
