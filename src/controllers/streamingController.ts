import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import { promisify } from 'util';
import ApiError from '../helpers/ApiError';
import StreamingService from '../services/streamingService';

class StreamingAnime {
    // eslint-disable-next-line consistent-return
    async create(req: Request, res: Response, next: NextFunction) {
        const { anime, episode } = req.params;

        const animeDb = await new StreamingService().checkData(parseInt(anime, 10), parseInt(episode, 10));

        const path = `${process.cwd()}/animes/${animeDb.category}/${animeDb.id}/episodes/episodes${episode}.mp4`;

        const stat = await promisify(fs.stat)(path).catch(() => {
            throw new ApiError('Could not find directory for episode');
        });
        const fileSize = stat.size;
        const { range } = req.headers;

        if (range) {
            const parts = range.replace(/bytes=/, '').split('-');
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

            const chunksize = end - start + 1;
            const file = fs.createReadStream(path, { start, end });
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            };

            res.writeHead(206, head);
            file.pipe(res);
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(200, head);
            fs.createReadStream(path).pipe(res);
        }
    }
}

export default StreamingAnime;
