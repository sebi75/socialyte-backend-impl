import { Request, Response, NextFunction } from "express"
import { StatusCodes, Errors, RESPONSE_TYPES } from "../../../types"

import { CommentsModel } from "../../../models"
import { logger } from "../../../utils"

export const existsCommentMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { commentId } = req.body

  if (!commentId) {
    return res.status(StatusCodes.BAD_REQUEST).send({
      type: RESPONSE_TYPES.ERROR,
      error: Errors.NOT_FOUND,
    })
  }

  try {
    const comment = await CommentsModel.findOne({
      where: { commentId },
    })
    if (comment) {
      return next()
    }
    return res.status(StatusCodes.NOT_FOUND).send({
      type: RESPONSE_TYPES.ERROR,
      error: Errors.NOT_FOUND,
    })
  } catch (error) {
    logger.error(`Error while checking if comment exists: ${error}`)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      type: RESPONSE_TYPES.ERROR,
      error: Errors.SOMETHING_WENT_WRONG,
    })
  }
}
