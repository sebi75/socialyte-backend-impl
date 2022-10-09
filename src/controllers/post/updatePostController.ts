import { Request, Response } from "express"
import { PostsModel } from "../../models"
import { Errors, RESPONSE_TYPES, StatusCodes } from "../../types"
import { logger } from "../../utils"

export const updatePostController = async (req: Request, res: Response) => {
  const { newCaption } = req.body
  const { postId } = req.params

  if (!newCaption || !postId) {
    return res.status(StatusCodes.BAD_REQUEST).send({
      type: RESPONSE_TYPES.ERROR,
      errorMessage: Errors.MISSING_FIELDS,
    })
  }
  try {
    const post = await PostsModel.findOne({
      where: { postId: req.params.postId },
    })
    if (!post) {
      return res.status(StatusCodes.NOT_FOUND).send({
        type: RESPONSE_TYPES.ERROR,
        errorMessage: Errors.NOT_FOUND,
      })
    }
    const updatedPost = await post?.update({
      postCaption: newCaption,
    })
    if (updatedPost) {
      return res.status(StatusCodes.OK).send({
        type: RESPONSE_TYPES.SUCCESS,
        data: updatedPost,
      })
    }
  } catch (error) {
    logger.error(`Error updating post with id: ${postId} with error: ${error}`)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      type: RESPONSE_TYPES.ERROR,
      errorMessage: Errors.SOMETHING_WENT_WRONG,
    })
  }
}
