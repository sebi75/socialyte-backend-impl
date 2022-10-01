import dotenv from "dotenv"
export type envType = "development" | "production" | "test"

export const getDbConfiguration = (env: envType) => {
  dotenv.config()
  switch (env) {
    case "development":
      return {
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT as unknown as number,
      }
    case "test":
      return {
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_TEST_NAME,
        port: process.env.DB_PORT as unknown as number,
      }
    default:
      throw new Error("You need to provide valid type of environment.")
  }
}

export const sequelizeConfig = [
  {
    pool: {
      max: 1000,
      min: 0,
      idle: 10000,
    },
  },
]
