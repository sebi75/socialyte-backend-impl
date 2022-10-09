import express from "express"
import {
  likePostController,
  isLikeableMiddleware,
  isUnlikeablePostMiddleware,
  unlikePostController,
  authMiddleware,
} from "../controllers"

const likes = express.Router()

likes.post(
  "/likes/like/:userId",
  authMiddleware,
  isLikeableMiddleware,
  likePostController
)
likes.post(
  "/likes/unlike/:userId",
  authMiddleware,
  isUnlikeablePostMiddleware,
  unlikePostController
)

export default likes
