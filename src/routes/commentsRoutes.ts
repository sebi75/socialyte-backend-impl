import express from "express"
import {
  createCommentController,
  existsCommentMiddleware,
  getPostCommentsController,
  deleteCommentController,
  updateCommentController,
} from "../controllers"

const comments = express.Router()

comments.get("/comments/:postId", getPostCommentsController)
comments.post("/comments/create", createCommentController)
comments.post(
  "/comments/update",
  existsCommentMiddleware,
  updateCommentController
)
comments.delete(
  "/comments/delete",
  existsCommentMiddleware,
  deleteCommentController
)

export default comments
