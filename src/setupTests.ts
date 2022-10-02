import { sequelize } from "./db/dbPool"

afterAll(async () => {
  await sequelize.close()
})
