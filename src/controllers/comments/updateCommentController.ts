import { Request, Response } from "express"
import { Errors, RESPONSE_TYPES, StatusCodes } from "../../types"
import { CommentsModel } from "../../models"

export const updateCommentController = async (req: Request, res: Response) => {
  const { commentId, commentText } = req.body

  try {
    const comment = await CommentsModel.findOne({
      where: {
        commentId,
      },
    })

    await comment?.update({
      commentText,
    })
    return res.status(StatusCodes.OK).send({
      type: RESPONSE_TYPES.SUCCESS,
      data: comment,
    })
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      type: RESPONSE_TYPES.ERROR,
      error: Errors.SOMETHING_WENT_WRONG,
    })
  }
}
