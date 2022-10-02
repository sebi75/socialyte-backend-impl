import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize"
import { sequelize } from "../../db/dbPool"

export interface ILikedModel
  extends Model<
    InferAttributes<ILikedModel>,
    InferCreationAttributes<ILikedModel>
  > {
  likeId: CreationOptional<string>
  postId: string
  userId: string
  createdAt: CreationOptional<Date>
}

export const LikesModel = sequelize.define<ILikedModel>("Likes", {
  likeId: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  postId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Posts",
      key: "postId",
    },
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Users",
      key: "userId",
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
})
