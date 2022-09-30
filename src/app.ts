import express, { Response, Request } from "express"
import * as dotenv from "dotenv"

import { connectDb } from "./db/connection"

dotenv.config()

const app: express.Application = express()
const PORT = process.env.PORT

connectDb()

import { userRouter } from "./routes"
import { helloController } from "./controllers/helloController"

app.get("/test", helloController)

app.use("/api", userRouter)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
