import { getDbConfiguration, sequelizeConfig } from "../config/environment"
import * as dotenv from "dotenv"
import { Sequelize } from "sequelize"

dotenv.config()

let sequelize: Sequelize

const connectToDB = async (env: "test" | "development") => {
  const { database, user, password, port, host } = getDbConfiguration(env)

  sequelize = new Sequelize(
    `mysql://${user}:${password}@${host}:${port}/${database}`,
    ...sequelizeConfig
  )

  try {
    await sequelize.authenticate()

    //note: when tables get modified, you need to run the tests once with force: true
    if (env === "test") {
      await sequelize.sync({ alter: true })
    } else {
      await sequelize.sync({ alter: true })
    }
    console.log(`Connected to database and synced tables`)
  } catch (error: any) {
    console.log("Error connecting to database: ", error)
  }
}

if (process.env.NODE_ENV === "test") {
  connectToDB("test")
} else if (process.env.NODE_ENV === "development") {
  connectToDB("development")
}

export { sequelize }
