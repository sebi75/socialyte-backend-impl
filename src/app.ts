import express from "express"
import * as dotenv from "dotenv"

import { connectDb } from "./db/connection"
import bodyParser from "body-parser"
import { setAssociations } from "./models"

dotenv.config()

//TODO: create an enum that contains the types of errors the api can encounter

const app: express.Application = express()
const PORT = process.env.PORT

connectDb()
setAssociations()
app.use(bodyParser.json())

import { authRouter } from "./routes"

app.use("/api", authRouter)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
