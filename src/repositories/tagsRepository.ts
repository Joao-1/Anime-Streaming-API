import ApiError from "../helpers/ApiError";
import Tags from "../models/tags";

class TagsRepository {
    async create(tagName: string) {
        try {
            await Tags.create({ nameTag: tagName });
        } catch (error) {
            throw new ApiError('Error creating tag', 500);
        };
    };

    async findAllTags() {
        try {
            return await Tags.findAll();
        } catch (error) {
            throw new ApiError('Error looking for tags', 500);
        };
    };

    async checkTagExist(name: string): Promise<boolean> {
        try {
            const animeExist = await Tags.findOne({ where: { nameTag: name } });
            return animeExist ? true : false
        } catch (error) {
            console.log(error);
            throw new ApiError('error checking if tags exist on server', 500);
        };
    };
};

export default TagsRepository;