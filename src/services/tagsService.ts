import ApiError from '../helpers/ApiError';
import Tags from '../models/tags';
import TagsRepository from '../repositories/tagsRepository';

class tagsServices {
    tagsRepository: TagsRepository;

    constructor() {
        this.tagsRepository = new TagsRepository();
    }

    async create(tagName: string): Promise<Tags> {
        if (await this.tagsRepository.checkTagExist(tagName)) {
            throw new ApiError('Tag already exists', 400);
        }
        const tag = this.tagsRepository.create(tagName);
        return tag;
    }
}

export default tagsServices;
