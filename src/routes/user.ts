import express, { Request, Response } from "express"

import { getUsersController, createUsersController } from "../controllers"

const user = express.Router()

user.get("/users", getUsersController)
user.post("/users/create", createUsersController)

export default user
