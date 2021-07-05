import { Table, Column, Model, HasMany, AllowNull, DataType, Default, ForeignKey } from 'sequelize-typescript';
import Animes from './animes';
import Tags from './tags';

@Table
class Tags_animes extends Model {
    @AllowNull(false)
    @ForeignKey(() => Animes)
    @Column
    AnimeId!: number;

    @AllowNull(false)
    @ForeignKey(() => Tags)
    @Column
    TagId!: number;
}

export default Tags_animes;
