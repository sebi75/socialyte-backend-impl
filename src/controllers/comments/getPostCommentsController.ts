import { Request, Response } from "express"
import { Errors, RESPONSE_TYPES, StatusCodes } from "../../types"

import { CommentsModel } from "../../models"
import { logger } from "../../utils"

export const getPostCommentsController = async (
  req: Request,
  res: Response
) => {
  const { postId } = req.params

  try {
    const comments = await CommentsModel.findAll({
      where: { postId },
    })
    return res.status(StatusCodes.OK).send({
      type: RESPONSE_TYPES.SUCCESS,
      data: comments,
    })
  } catch (error) {
    logger.error(`Error while getting comments for post ${postId}: ${error}`)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      type: RESPONSE_TYPES.ERROR,
      error: Errors.SOMETHING_WENT_WRONG,
    })
  }
}
