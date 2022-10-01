import { getDbConfiguration } from "./config/environment"
import { Sequelize } from "sequelize"

let connection: Sequelize
beforeAll(async () => {
  const env = "test"
  const dbConfig = getDbConfiguration(env)
  connection = new Sequelize(
    `mysql://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`
  )
  await connection.authenticate()
})

afterAll(async () => {
  await connection.close()
})
