export interface IAnime {
  name: string;
  description: string;
  category: string;
  author?: string;
  studio?: string;
  director?: string;
  realeaseYear?: string;
  status?: string;
  tags: string[];
}
