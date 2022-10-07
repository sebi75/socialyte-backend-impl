import express from "express"

import { followUserController } from "../controllers/connections/followUserController"
import { getFollowersController } from "../controllers/connections/getFollowersController"

const connections = express.Router()

connections.post("/connections/:userId/:followUserId", followUserController)
connections.get("/connections/:userId", getFollowersController)

export default connections
