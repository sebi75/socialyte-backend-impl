import express from "express"
import {
  createPostController,
  updatePostController,
  deletePostController,
} from "../controllers"

const posts = express.Router()

posts.post("/posts/create", createPostController)
posts.post("/posts/update", updatePostController)
posts.delete("/posts/delete", deletePostController)

export default posts
