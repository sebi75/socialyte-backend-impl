export const getDbConfiguration = () => ({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_NAME,
  port: process.env.DB_PORT as unknown as number,
})

export const sequelizeConfig = [
  {
    pool: {
      max: 1000,
      min: 0,
      idle: 10000,
    },
  },
]
