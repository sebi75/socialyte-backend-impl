import { Request, Response } from "express"
import { Errors, RESPONSE_TYPES, StatusCodes } from "../../types"

import { CommentsModel } from "../../models"
import { logger } from "../../utils"

export const createCommentController = async (req: Request, res: Response) => {
  const { postId, userId, comment } = req.body

  try {
    const newComment = await CommentsModel.create({
      postId,
      userId,
      commentText: comment,
    })
    return res.status(StatusCodes.OK).send({
      type: RESPONSE_TYPES.SUCCESS,
      data: newComment,
    })
  } catch (error) {
    logger.error(`Error while creating comment for post ${postId}: ${error}`)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      type: RESPONSE_TYPES.ERROR,
      error: Errors.SOMETHING_WENT_WRONG,
    })
  }
}
