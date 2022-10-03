import { sequelize } from "./db/dbPool"

afterAll(async () => {
  console.log("Closing connection to the database after all the tests ran")
  await sequelize.close()
})
