import express, { Request, Response } from "express"
import { range } from "lodash"

import { getUserController } from "../controllers/users/getUserController"

const users = express.Router()

users.get("/users/:userId/:includeProfile?", getUserController)

users.post("/users/upload", (req: Request, res: Response) => {
  console.log(req.headers["content-type"])
  console.log(req.body)
})

export default users
