import express from "express"
import {
  likePostController,
  isLikeableMiddleware,
  isUnlikeablePostMiddleware,
  unlikePostController,
} from "../controllers"

const likes = express.Router()

likes.post("/likes/like/:userId", isLikeableMiddleware, likePostController)
likes.post(
  "/likes/unlike/:userId",
  isUnlikeablePostMiddleware,
  unlikePostController
)

export default likes
