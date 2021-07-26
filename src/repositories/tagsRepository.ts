import ApiError from '../helpers/ApiError';
import Tags from '../models/tags';

class TagsRepository {
    async create(tagName: string): Promise<Tags> {
        const tag = await Tags.create({ name: tagName }).catch(() => {
            throw new ApiError('Error creating tag in database', 500);
        });
        return tag;
    }

    async findAllTags(): Promise<Tags[]> {
        const tags = await Tags.findAll().catch(() => {
            throw new ApiError('Error looking for tags in database', 500);
        });
        return tags;
    }

    async checkTagExistWithName(name: string): Promise<boolean> {
        const tag = await Tags.findOne({ where: { name } }).catch(() => {
            throw new ApiError('Error checking if tags exist in database', 500);
        });

        return !!tag;
    }
}

export default TagsRepository;
