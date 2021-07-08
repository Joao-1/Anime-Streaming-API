import { Table, Column, Model, AllowNull, BelongsToMany } from "sequelize-typescript";
import Animes from "./animes";
import TagsAnimes from "./tags_animes";

@Table
class Tags extends Model {
  @AllowNull(false)
  @Column
  nameTag!: string;

  @BelongsToMany(() => Animes, () => TagsAnimes)
  episodes!: Animes[];
}

export default Tags;
