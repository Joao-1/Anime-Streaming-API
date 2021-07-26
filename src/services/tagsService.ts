import ApiError from '../helpers/ApiError';
import Tags from '../models/tags';
import TagsRepository from '../repositories/tagsRepository';

class tagsServices {
    tagsRepository: TagsRepository;

    constructor() {
        this.tagsRepository = new TagsRepository();
    }

    async create(tagName: string): Promise<Tags> {
        if (await this.tagsRepository.checkTagExistWithName(tagName)) {
            throw new ApiError('Tag already exists', 400);
        }
        const tag = this.tagsRepository.create(tagName);
        return tag;
    }

    async readTags() {
        const tags = this.tagsRepository.findAllTags();
        return tags;
    }

    async updateTag(tagName: string, newName: string) {
        if (!(await this.tagsRepository.checkTagExistWithName(tagName))) {
            throw new ApiError('Tags does not exist', 400);
        }
        const tags = await this.tagsRepository.updateTag(tagName, newName);
        return tags;
    }

    async deleteTag(tagName: string) {
        if (!(await this.tagsRepository.checkTagExistWithName(tagName))) {
            throw new ApiError('Tags does not exist', 400);
        }
        await this.tagsRepository.deleteTag(tagName);
    }
}

export default tagsServices;
