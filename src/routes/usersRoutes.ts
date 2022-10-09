import express from "express"

import {
  getUserController,
  updateUserProfileController,
  getUserProfileDataController,
} from "../controllers"

const users = express.Router()

users.get("/users/profile/:userId", getUserProfileDataController)
users.get("/users/:username/:includeProfile?", getUserController)
users.post("/users/update", updateUserProfileController)

export default users
