import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize"
import { sequelize } from "../../db/dbPool"

export interface IPostsModel
  extends Model<
    InferAttributes<IPostsModel>,
    InferCreationAttributes<IPostsModel>
  > {
  postId: CreationOptional<string>
  ownerId: string
  postCaption: string
  createdAt: CreationOptional<Date>
  updatedAt: CreationOptional<Date>
  media: Buffer
}

export const PostsModel = sequelize.define<IPostsModel>("Posts", {
  postId: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  ownerId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Users",
      key: "userId",
    },
  },
  postCaption: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  media: {
    type: DataTypes.BLOB("long"),
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
})
