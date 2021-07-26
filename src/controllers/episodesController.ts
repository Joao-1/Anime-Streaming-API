import { Request, Response, NextFunction } from 'express';
import ApiError from '../helpers/ApiError';
import EpisodesServices from '../services/episodesService';

class Epidodes {
    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { name, postAuthor } = req.body;
        const animeId = req.params.anime as unknown as number;
        // Adicionar opção de poder ter episódio 0
        // VERIFICAR SE ESSE MEMBRO TEM PERMISSAO DE FAZER ISSO
        const newEpisode = await new EpisodesServices().create(
            {
                animeId,
                name,
                postAuthor: postAuthor || 1,
            },
            req.file!.path
        );
        res.status(201).json({ status: 'sucess', newEpisode });
    }

    async read(req: Request, res: Response, next: NextFunction): Promise<void> {
        const episodes = req.query.episodes as number[] | undefined;
        const animeId = req.params.anime as unknown as number;
        const eps = await new EpisodesServices().getEp(animeId, episodes);
        res.json({ status: 'sucess', animeId, episode: eps });
    }

    async upload(req: Request, res: Response, next: NextFunction): Promise<void> {
        const animeId = req.params.anime as unknown as number;
        const episodeId = req.params.id as unknown as number;
        const eps = await new EpisodesServices().updateEp(req.body, animeId, episodeId);
        if (!eps[0]) throw new ApiError('No fields were found. Check if the syntax is correct', 202);
        res.status(200).json({ status: 'sucess', message: 'Episode updated successfully' });
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        const animeId = req.params.anime as unknown as number;
        const episodeId = req.params.id as unknown as number;
        await new EpisodesServices().delete(animeId, episodeId);
        res.status(200).json({ status: 'sucess', message: 'Anime successfully deleted' });
    }
}

export default Epidodes;
