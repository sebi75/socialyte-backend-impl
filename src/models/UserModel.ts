import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize"
import { sequelize } from "../db/dbPool"

export interface IUserModel
  extends Model<
    InferAttributes<IUserModel>,
    InferCreationAttributes<IUserModel>
  > {
  uid: CreationOptional<string>
  email: string
  username: string
  createdAt: CreationOptional<Date>
  updatedAt: CreationOptional<Date>
}

export const UserModel = sequelize.define<IUserModel>("User", {
  uid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
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
