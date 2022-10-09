import express from "express"

import {
  getUserController,
  updateUserProfileController,
  getUserProfileDataController,
  authMiddleware,
} from "../controllers"

const users = express.Router()

users.get("/users/profile/:userId", getUserProfileDataController)
users.get("/users/:username/:includeProfile?", getUserController)
users.post("/users/update", authMiddleware, updateUserProfileController)

export default users
