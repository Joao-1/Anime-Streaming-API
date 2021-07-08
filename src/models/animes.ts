import {
  Table,
  Column,
  Model,
  HasMany,
  AllowNull,
  DataType,
  Default,
  BelongsToMany,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";
import AnimeEpisodes from "./animeEpisodes";
import Tags from "./tags";
import TagsAnimes from "./tags_animes";

@Table
class Animes extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column
  name!: string;

  @AllowNull(false)
  @Column(DataType.TEXT({ length: "long" }))
  description!: string;

  @Column
  studio!: string;

  @AllowNull(false)
  @Column
  category!: string;

  @Column
  releaseYear!: string;

  @Column
  author!: string;

  @Column
  director!: string;

  @Default(0)
  @Column
  numberOfEpisodes!: number;

  @Default("incomplete")
  @Column
  status!: string;

  @HasMany(() => AnimeEpisodes)
  episodes!: AnimeEpisodes[];

  @BelongsToMany(() => Tags, () => TagsAnimes)
  tags!: Tags[];
}

export default Animes;
