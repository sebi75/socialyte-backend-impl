import express from "express"

import { getUserController } from "../controllers/users/getUserController"

const users = express.Router()

users.get("/users/:userId/:includeProfile?", getUserController)

export default users
