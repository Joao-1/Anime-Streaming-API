import { Request, Response, NextFunction } from 'express';
import NewTag from '../services/tagsService';

class AddTag {
    async create(req: Request, res: Response, next: NextFunction) {
        // fazer com que seja possivel criar mais de uma tag de uma só vez
        const newTag = await new NewTag().create(req.body.name);
        return res.status(201).json({ status: 'sucess', message: `${newTag.name} tag created successfully` });
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
