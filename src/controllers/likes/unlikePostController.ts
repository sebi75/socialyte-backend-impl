import { Request, Response } from "express"
import { LikesModel } from "../../models"
import { StatusCodes, Errors, RESPONSE_TYPES } from "../../types"

import { logger } from "../../utils"

export const unlikePostController = async (req: Request, res: Response) => {
  const { userId, postId, email } = req.body

  try {
    const unlikedPost = await LikesModel.destroy({
      where: {
        postId,
        userId,
      },
    })
    return res.status(StatusCodes.OK).send({
      type: RESPONSE_TYPES.SUCCESS,
      unlikedPost,
    })
  } catch (error) {
    logger.error(`Error unliking post with id: ${postId} with error: ${error}`)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      type: RESPONSE_TYPES.ERROR,
      errorMessage: Errors.SOMETHING_WENT_WRONG,
    })
  }
}
