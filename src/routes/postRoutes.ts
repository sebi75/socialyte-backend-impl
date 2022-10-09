import express from "express"
import {
  createPostController,
  updatePostController,
  deletePostController,
  authMiddleware,
  isPostOwnerMiddleware,
} from "../controllers"

const posts = express.Router()

posts.post("/posts/create", authMiddleware, createPostController)
posts.post(
  "/posts/update",
  authMiddleware,
  isPostOwnerMiddleware,
  updatePostController
)
posts.delete(
  "/posts/delete",
  authMiddleware,
  isPostOwnerMiddleware,
  deletePostController
)

export default posts
