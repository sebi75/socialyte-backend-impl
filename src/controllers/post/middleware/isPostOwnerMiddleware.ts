import { Request, Response, NextFunction } from "express"
import { PostsModel } from "../../../models"
import { StatusCodes, Errors, RESPONSE_TYPES } from "../../../types"
import { logger } from "../../../utils"

export const isPostOwnerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, postId } = req.body
  try {
    const post = await PostsModel.findOne({
      where: { postId },
    })
    if (post?.ownerId != userId) {
      return res.status(StatusCodes.UNAUTHORIZED).send({
        type: RESPONSE_TYPES.ERROR,
        errorMessage: Errors.UNAUTHORIZED,
      })
    }
    next()
  } catch (error) {
    logger.error(
      `Error while checking if user ${userId} is owner of post ${postId}: ${error}`
    )
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      type: RESPONSE_TYPES.ERROR,
      errorMessage: Errors.SOMETHING_WENT_WRONG,
    })
  }
}
