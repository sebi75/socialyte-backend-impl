import { Request, Response } from "express"
import { StatusCodes, Errors, RESPONSE_TYPES } from "../../types"
import { CommentsModel } from "../../models"
import { logger } from "../../utils"

export const deleteCommentController = async (req: Request, res: Response) => {
  const { commentId } = req.body

  try {
    const deletedComment = await CommentsModel.destroy({
      where: {
        commentId,
      },
    })
    return res.status(StatusCodes.OK).send({
      type: RESPONSE_TYPES.SUCCESS,
      data: deletedComment,
    })
  } catch (error) {
    logger.error(`Error while deleting comment ${commentId}: ${error}`)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      type: RESPONSE_TYPES.ERROR,
      error: Errors.SOMETHING_WENT_WRONG,
    })
  }
}
