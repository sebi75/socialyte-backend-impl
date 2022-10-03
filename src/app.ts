import express from "express"
import * as dotenv from "dotenv"

import bodyParser from "body-parser"
import { setAssociations } from "./models"

dotenv.config()

//TODO: create an enum that contains the types of errors the api can encounter
//TODO: find a way to mock the JWT token in the tests (maybe sign a new one for a newly created user and have it available during tests run)
//TODO: find an abstraction for validation and implement it in the rest api

const app: express.Application = express()
const PORT = process.env.PORT

setAssociations()
app.use(bodyParser.json())

import { authRouter } from "./routes"

app.use("/api", authRouter)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
