import { Table, Column, Model, AllowNull, ForeignKey } from 'sequelize-typescript';
import Animes from './animes';

@Table
class AnimeEpisodes extends Model {
    @Column
    name!: string;

    @ForeignKey(() => Animes)
    @AllowNull(false)
    @Column
    AnimeId!: number;

    @AllowNull(false)
    @Column
    numberEpisode!: number;

    @AllowNull
    @Column
    postAuthor!: string;
}

export default AnimeEpisodes;
