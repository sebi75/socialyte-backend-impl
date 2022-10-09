import express from "express"

import {
  followUserController,
  getFollowersController,
  followableMiddleware,
  unfollowUserController,
  unfollowableMiddleware,
  getFollowingsController,
} from "../controllers"

const connections = express.Router()

connections.get("/connections/followers", getFollowersController)
connections.get("/connections/followings", getFollowingsController)

connections.post(
  "/connections/follow",
  followableMiddleware,
  followUserController
)
connections.post(
  "connections/unfollow",
  unfollowableMiddleware,
  unfollowUserController
)
connections.get("/connections/:userId", getFollowersController)

export default connections
