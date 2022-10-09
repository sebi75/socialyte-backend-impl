import express from "express"
import {
  createCommentController,
  existsCommentMiddleware,
  getPostCommentsController,
  deleteCommentController,
  updateCommentController,
  authMiddleware,
} from "../controllers"

const comments = express.Router()

comments.get("/comments/:postId", getPostCommentsController)
comments.post("/comments/create", authMiddleware, createCommentController)
comments.post(
  "/comments/update",
  authMiddleware,
  existsCommentMiddleware,
  updateCommentController
)
comments.delete(
  "/comments/delete",
  authMiddleware,
  existsCommentMiddleware,
  deleteCommentController
)

export default comments
