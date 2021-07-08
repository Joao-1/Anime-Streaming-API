import { Request, Response, NextFunction } from "express";
import multer from "multer";
import path from "path";
import Joi from "joi";
import ApiError from "../helpers/ApiError";
import AnimesService from "../services/animesService";
// import logger from "../logs/logger";

const animeDataVerify = Joi.object({
  name: Joi.string().alphanum().replace(/( )+/g, " ").required(),
  category: Joi.string().required(),
  description: Joi.string().required(),
  author: Joi.string().allow(""),
  studio: Joi.string().allow(""),
  director: Joi.string().allow(""),
  realeaseYear: Joi.string().allow(""),
  tags: Joi.array().items(Joi.string().allow("")),
  image: Joi.string().required(),
  imageType: Joi.string().valid("image/png"),
});

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, `${process.cwd()}/uploads`);
  },
  filename(req, file, cb) {
    cb(null, file.originalname + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage }).single("image");

class UploadAnime {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    upload(req, res, async () => {
      try {
        const { name, description, category, author, studio, director, realeaseYear, tags } = req.body;
        const values = await animeDataVerify
          .validateAsync({
            name,
            category,
            description,
            author,
            studio,
            director,
            realeaseYear,
            tags: tags.split(","),
            image: req.file?.path,
            imageType: req.file?.mimetype,
          })
          .catch((e) => {
            throw new ApiError(e.message, 422);
          });

        const anime = await new AnimesService().create(values);
        return res.status(201).json({
          message: `Anime ${values.name} created successfully`,
          id: anime?.id,
        });
      } catch (error) {
        return next(new ApiError(error.message, error.status));
      }
    });
  }

  async read(req: Request, res: Response, next: NextFunction) {
    const offset: number | undefined = parseInt(req.query.offset?.toString() || "1", 10);
    const limit: number | undefined = parseInt(req.query.limit?.toString() || "100", 10);

    if (!offset || !limit) return next(new ApiError("The paging parameters must be numbers", 400));

    try {
      const animes = await new AnimesService().getAnimes(offset, limit);
      return res.status(200).json(animes);
    } catch (error) {
      return next(new ApiError(error.message, error.status));
    }
  }

  async upload(req: Request, res: Response, next: NextFunction) {
    const idAnime = req.params.id;
    if (!idAnime) return next(new ApiError("Id not provied", 400));
    try {
      const animeUpdated = await new AnimesService().updateAnime(req.body, idAnime);
      if (!animeUpdated[0]) next(new ApiError("No fields were found. Check if the syntax is correct", 202));
      return res.status(200).json({ message: "Fields successfully updated" });
    } catch (error) {
      return next(new ApiError(error.message, error.status));
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const idAnime = req.params.id;
    if (!idAnime) return next(new ApiError("Id not provied", 400));
    try {
      await new AnimesService().delete(idAnime);
      return res.status(200).json({ message: "Anime successfully deleted" });
    } catch (error) {
      return next(new ApiError(error.message, error.status));
    }
  }
}

export default UploadAnime;
