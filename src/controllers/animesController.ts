import { Request, Response, NextFunction } from "express";
import multer from "multer";
import path from "path";
import ApiError from "../helpers/ApiError";
import verificationValues from "../helpers/verificationValues";
import AnimesService from "../services/animesService";
import moveFiles from "../helpers/moveFiles";

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
      const valueNull = verificationValues(req.body, ["name", "category", "description", "tags"]);
      if (valueNull) return next(new ApiError(`${valueNull} not provided`, 412));
      if (!req.file?.path) return next(new ApiError("Image not provided", 412));
      if (req.file?.mimetype !== "image/png") return next(new ApiError("Unsupported image type", 406));

      const { description, category, author, studio, director, realeaseYear, tags } = req.body;
      const name = req.body.name.replace(/( )+/g, " ");
      try {
        const anime = await new AnimesService().create({
          name,
          description,
          category,
          author,
          studio,
          director,
          realeaseYear,
          tags: tags.split(","),
        });

        const nameFormated: string = name.toLowerCase().replace(/\s/g, "_");

        const pathAnime = await new AnimesService()
          .createAnimeDirectory(category.toLowerCase(), nameFormated)
          .catch((error) => {
            new AnimesService().delete(anime!.id);
            throw new ApiError(error.message || "Error creating anime directory", 500);
          });

        await moveFiles(req.file.path, `${pathAnime + nameFormated}Poster${path.extname(req.file.path)}`);

        return res.status(201).json({
          message: `Anime ${name} created successfully`,
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
