import { Table, Column, Model, AllowNull, ForeignKey } from "sequelize-typescript";
import Animes from "./animes";
import Tags from "./tags";

@Table
class TagsAnimes extends Model {
  @AllowNull(false)
  @ForeignKey(() => Animes)
  @Column
  AnimeId!: number;

  @AllowNull(false)
  @ForeignKey(() => Tags)
  @Column
  TagId!: number;
}

export default TagsAnimes;
