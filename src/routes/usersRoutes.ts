import express from "express"

import { getUserController, updateUserProfileController } from "../controllers"

const users = express.Router()

users.get("/users/:username/:includeProfile?", getUserController)
users.post("/users/update", updateUserProfileController)

export default users
