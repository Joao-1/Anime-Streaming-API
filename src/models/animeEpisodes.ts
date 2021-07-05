import { Table, Column, Model, AllowNull, DataType, ForeignKey } from 'sequelize-typescript';
import Animes from './animes';

@Table
class AnimeEpisodes extends Model {
  @Column
  name!: string;

  @ForeignKey(() => Animes)
  @AllowNull(false)
  @Column
  AnimeId!: number

  @AllowNull(false)
  @Column
  numberEpisode!: string;

  @AllowNull
  @Column
  postAuthor!: string;
}

export default AnimeEpisodes;
