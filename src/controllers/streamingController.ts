import { NextFunction, Request, Response } from "express";
import fs from "fs";
import ApiError from "../helpers/ApiError";
import validationValues from "../helpers/verificationValues";
import AnimeRepository from "../repositories/animesRepository";
import StreamingService from "../services/streamingService";

class StreamingAnime {
  // eslint-disable-next-line consistent-return
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { anime, episode } = req.params;
      validationValues(req.params, ["anime", "episode"]);

      const ep = parseInt(anime, 10);
      if (!ep)
        return next(
          new ApiError("Id provided not compatible with expected.", 400)
        );

      const animeInfo = await new AnimeRepository().checkWithIdIfAnimeExists(
        anime
      );

      if (!animeInfo) {
        return next(new ApiError("Anime not found in database", 404));
      }

      if (parseInt(episode, 10) > animeInfo.numberOfEpisodes) {
        return next(new ApiError("Provided episode does not exist", 404));
      }

      const path = new StreamingService().createURl(
        animeInfo.category,
        animeInfo.name.toLowerCase().replace(/\s/g, "_"),
        episode
      );
      const stat = fs.statSync(path);
      const fileSize = stat.size;
      const { range } = req.headers;

      if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        const chunksize = end - start + 1;
        const file = fs.createReadStream(path, { start, end });
        const head = {
          "Content-Range": `bytes ${start}-${end}/${fileSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": chunksize,
          "Content-Type": "video/mp4",
        };

        res.writeHead(206, head);
        file.pipe(res);
      } else {
        const head = {
          "Content-Length": fileSize,
          "Content-Type": "video/mp4",
        };
        res.writeHead(200, head);
        fs.createReadStream(path).pipe(res);
      }
    } catch (error) {
      return next(new ApiError(error.message, error.status));
    }
  }
}
export default StreamingAnime;
