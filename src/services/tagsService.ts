import ApiError from '../helpers/ApiError';
import Tags from '../models/tags';
import TagsRepository from '../repositories/tagsRepository';

class tagsServices {
    async create(tagName: string): Promise<Tags> {
        if (await new TagsRepository().checkTagExist(tagName)) {
            throw new ApiError('Tag already exists', 400);
        }
        const tag = new TagsRepository().create(tagName);
        return tag;
    }
}

export default tagsServices;
