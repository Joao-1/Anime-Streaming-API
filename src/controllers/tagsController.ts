import { Request, Response, NextFunction } from 'express';
import ApiError from '../helpers/ApiError';
import NewTag from '../services/tagsService';

class AddTag {
    async create(req: Request, res: Response, next: NextFunction) {
        // fazer com que seja possivel criar mais de uma tag de uma só vez
        if (!req.body.tag) {
            return next(new ApiError('New tag name not informed', 412));
        }
        const tag = await new NewTag().create(req.body.tag);
        return res.status(201).json({ status: 'Sucess', message: `${tag.nameTag} tag created successfully` });
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
