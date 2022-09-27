//import { sequelize } from "./dbPool"
import { getDbConfiguration, sequelizeConfig } from "../config"
import * as dotenv from "dotenv"
//import { Sequelize } from "sequelize"
import { sequelize } from "./dbPool"

import { UserModel } from "../models/UserModel"

dotenv.config()

/* const { database, user, password, port, host } = getDbConfiguration()
export const sequelize = new Sequelize(
  `mysql://${user}:${password}@${host}:${port}/${database}`,
  ...sequelizeConfig
) */

export const connectDb = async () => {
  try {
    await sequelize.authenticate()
    await UserModel.sync({ alter: true })
    console.log(`Connected to database: somedbName and synced tables`)
  } catch (error: any) {
    console.log("Error connecting to database: ", error)
  }
}
