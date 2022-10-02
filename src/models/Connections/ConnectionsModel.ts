import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize"
import { sequelize } from "../../db/dbPool"

export interface IConnectionsModel
  extends Model<
    InferAttributes<IConnectionsModel>,
    InferCreationAttributes<IConnectionsModel>
  > {
  connectionsId: CreationOptional<string>
  followingId: string
  followerId: string
  createdAt: CreationOptional<Date>
}

export const ConnectionsModel = sequelize.define<IConnectionsModel>(
  "Connections",
  {
    connectionsId: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    followingId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    followerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }
)
