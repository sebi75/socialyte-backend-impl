import express from "express"
import * as dotenv from "dotenv"

import bodyParser from "body-parser"
import { setAssociations } from "./models"

dotenv.config()

//TODO: create an enum that contains the types of errors the api can encounter
//TODO: find a way to mock the JWT token in the tests (maybe sign a new one for a newly created user and have it available during tests run)
//TODO: find an abstraction for validation and implement it in the rest api
//TODO: signing users up for tests is becoming very repetitive, find a way to abstract it into a separate function
//TODO make a loosely coupled functionality to generate or truncate data from the tables very easy.

const app: express.Application = express()
const PORT = process.env.PORT

setAssociations()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

import { authRouter } from "./routes"
import { usersRouter } from "./routes"
import { connectionsRouter } from "./routes"

app.use("/api", authRouter)
app.use("/api", usersRouter)
app.use("/api", connectionsRouter)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
