import * as dotenv from "dotenv"
import { sequelize } from "./dbPool"

import { UsersModel } from "../models/User/UserModel"

dotenv.config()

export const connectDb = async () => {
  try {
    await sequelize.authenticate()
    await UsersModel.sync({ alter: true })
    console.log(`Connected to database and synced tables`)
  } catch (error: any) {
    console.log("Error connecting to database: ", error)
  }
}
