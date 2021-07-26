export interface IEpisode {
    animeId: number;
    name: string;
    episode?: number;
    postAuthor: string;
}

export interface IUploadEpisode {
    name?: string;
    episode?: string;
}
