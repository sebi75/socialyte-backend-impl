import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize"
import { sequelize } from "../../db/dbPool"

export interface IUsersModel
  extends Model<
    InferAttributes<IUsersModel>,
    InferCreationAttributes<IUsersModel>
  > {
  userId: CreationOptional<string>
  email: string
  username: string
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
