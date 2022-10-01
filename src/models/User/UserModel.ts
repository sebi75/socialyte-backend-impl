import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize"
import { sequelize } from "../../db/dbPool"

import { PostsModel, LikesModel, ConnectionsModel, CommentsModel } from "../"

export interface IUsersModel
  extends Model<
    InferAttributes<IUsersModel>,
    InferCreationAttributes<IUsersModel>
  > {
  userId: CreationOptional<string>
  email: string
  username: string
  password: string
  createdAt: CreationOptional<Date>
  updatedAt: CreationOptional<Date>
}

export const UsersModel = sequelize.define<IUsersModel>("Users", {
  userId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
})

UsersModel.hasMany(PostsModel, { foreignKey: "ownerId" })
UsersModel.hasMany(LikesModel, { foreignKey: "userId" })
UsersModel.hasMany(CommentsModel, { foreignKey: "userId" })
UsersModel.hasMany(ConnectionsModel, { as: "userId", foreignKey: "userId" })
UsersModel.hasMany(ConnectionsModel, {
  as: "followerId",
  foreignKey: "followerId",
})
