import express from "express"
import {
  createPostController,
  updatePostController,
  deletePostController,
  isLikeableMiddleware,
  likePostController,
  unlikePostController,
  isUnlikeablePostMiddleware,
} from "../controllers"

const posts = express.Router()

posts.post("/posts/create", createPostController)
posts.post("/posts/update", updatePostController)
posts.delete("/posts/delete", deletePostController)
posts.post("/posts/like/:userId", isLikeableMiddleware, likePostController)
posts.post(
  "/posts/unlike/:userId",
  isUnlikeablePostMiddleware,
  unlikePostController
)
export default posts
