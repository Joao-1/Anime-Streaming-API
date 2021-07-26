import { Request, Response, NextFunction } from 'express';
import TagsService from '../services/tagsService';

class AddTag {
    async create(req: Request, res: Response, next: NextFunction) {
        // fazer com que seja possivel criar mais de uma tag de uma só vez
        const newTag = await new TagsService().create(req.body.name);
        res.status(201).json({ status: 'sucess', message: `${newTag.name} tag created successfully` });
    }

    async read(req: Request, res: Response, next: NextFunction): Promise<void> {
        const tags = await new TagsService().readTags();
        res.status(201).json({ status: 'sucess', tags });
    }

    async upload(req: Request, res: Response, next: NextFunction): Promise<void> {
        const tagName = req.params.name;
        const newName = req.body.name;
        await new TagsService().updateTag(tagName, newName);
        res.status(204).json({ status: 'sucess', message: 'Tag updated successfully' });
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        const tagName = req.params.name;
        await new TagsService().deleteTag(tagName);
        res.status(204).json({ status: 'sucess', message: 'Tag deleted successfully' });
    }
}

export default AddTag;
