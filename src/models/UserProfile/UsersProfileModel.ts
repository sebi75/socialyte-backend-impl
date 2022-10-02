import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize"
import { sequelize } from "../../db/dbPool"

export interface IUsersProfileModel
  extends Model<
    InferAttributes<IUsersProfileModel>,
    InferCreationAttributes<IUsersProfileModel>
  > {
  userProfileId: CreationOptional<string>
  userId: CreationOptional<string>
  bio: CreationOptional<string>
  country: CreationOptional<string>
  city: CreationOptional<string>
  updatedAt: CreationOptional<Date>
}

export const UsersProfileModel = sequelize.define<IUsersProfileModel>(
  "UserProfile",
  {
    userProfileId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      references: {
        model: "Users",
        key: "userId",
      },
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }
)
