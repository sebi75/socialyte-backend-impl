import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize"
import { sequelize } from "../../db/dbPool"

export interface ICommentsModel
  extends Model<
    InferAttributes<ICommentsModel>,
    InferCreationAttributes<ICommentsModel>
  > {
  commentId: CreationOptional<string>
  postId: string
  userId: string
  commentText: string
  createdAt: CreationOptional<Date>
  updatedAt: CreationOptional<Date>
}

export const CommentsModel = sequelize.define<ICommentsModel>("Comments", {
  commentId: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  postId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  commentText: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
})
