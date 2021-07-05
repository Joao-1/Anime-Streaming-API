import { Table, Column, Model, HasMany, AllowNull, DataType, Default, BelongsToMany, AutoIncrement, PrimaryKey } from 'sequelize-typescript';
import Animes from './animes';
import Tags_animes from './tags_animes';

@Table
class Tags extends Model {
    @AllowNull(false)
    @Column
    nameTag!: string;

    @BelongsToMany(() => Animes, () => Tags_animes)
    episodes!: Animes[];
}

export default Tags;