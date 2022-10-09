import express from "express"

import { followUserController, getFollowersController } from "../controllers"

const connections = express.Router()

connections.post("/connections/:userId/:followUserId", followUserController)
connections.get("/connections/:userId", getFollowersController)

export default connections
