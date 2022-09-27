import { getDbConfiguration, sequelizeConfig } from "../config/environment"
import * as dotenv from "dotenv"
import { Sequelize } from "sequelize"

dotenv.config()

const { database, user, password, port, host } = getDbConfiguration()
export const sequelize = new Sequelize(
  `mysql://${user}:${password}@${host}:${port}/${database}`,
  ...sequelizeConfig
)
