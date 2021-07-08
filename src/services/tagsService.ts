import ApiError from "../helpers/ApiError";
import TagsRepository from "../repositories/tagsRepository";

class tagsServices {
  async create(tagName: string): Promise<void> {
    try {
      if (await new TagsRepository().checkTagExist(tagName)) {
        throw new ApiError("Tag already exists", 400);
      }
      new TagsRepository().create(tagName);
    } catch (error) {
      throw new ApiError(error.message, error.status);
    }
  }
}

export default tagsServices;
