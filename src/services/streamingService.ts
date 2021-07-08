import ApiError from "../helpers/ApiError";

class StreamingService {
  createURl(category: string, animeName: string, episode: string) {
    return `${process.cwd()}/animes/${category}/${animeName}/episodes/episodes${episode}.mp4`;
  }
}

export default StreamingService;
