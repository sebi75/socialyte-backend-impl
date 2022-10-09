import express from "express"

import {
  getUserController,
  updateUserProfileController,
  getUserProfileDataController,
  authMiddleware,
} from "../controllers"
import { deleteAccountController } from "../controllers/users/deleteAccountController"

const users = express.Router()

users.get("/users/profile/:userId", getUserProfileDataController)
users.get("/users/:username/:includeProfile?", getUserController)
users.post("/users/update", authMiddleware, updateUserProfileController)
users.delete("/users/delete", authMiddleware, deleteAccountController)

export default users
