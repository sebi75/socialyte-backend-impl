import express from "express"

import {
  followUserController,
  getFollowersController,
  followableMiddleware,
  unfollowUserController,
  unfollowableMiddleware,
  getFollowingsController,
  authMiddleware,
} from "../controllers"

const connections = express.Router()

connections.get("/connections/followers", getFollowersController)
connections.get("/connections/followings", getFollowingsController)

connections.post(
  "/connections/follow",
  authMiddleware,
  followableMiddleware,
  followUserController
)
connections.post(
  "connections/unfollow",
  authMiddleware,
  unfollowableMiddleware,
  unfollowUserController
)
connections.get("/connections/:userId", getFollowersController)

export default connections
