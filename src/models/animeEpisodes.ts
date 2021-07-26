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
    episode!: number;

    @AllowNull
    @Column
    author!: string;
}

export default AnimeEpisodes;
