import { Request, Response, NextFunction } from "express";
import ApiError from "../helpers/ApiError";
import NewTag from "../services/tagsService";

class AddTag {
  async create(req: Request, res: Response, next: NextFunction) {
    if (!req.body.tag) {
      return next(new ApiError("New tag name not informed", 412));
    }
    try {
      await new NewTag().create(req.body.tag);
      return res.status(201).json("Tag created successfully");
    } catch (error) {
      return next(new ApiError(error.message, error.status));
    }
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

export default AddTag;
