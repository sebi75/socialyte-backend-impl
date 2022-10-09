import { Request, Response } from "express"
import { LikesModel, PostsModel } from "../../models"
import { Errors, RESPONSE_TYPES, StatusCodes } from "../../types"
import { logger } from "../../utils"

export const likePostController = async (req: Request, res: Response) => {
  const { postId, userId, email } = req.body

  try {
    const likedPost = await LikesModel.create({
      postId,
      userId,
    })
    return res.status(StatusCodes.OK).send({
      type: RESPONSE_TYPES.SUCCESS,
      data: likedPost,
    })
  } catch (error) {
    logger.error(`Error liking post with id: ${postId} with error: ${error}`)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      type: RESPONSE_TYPES.ERROR,
      errorMessage: Errors.SOMETHING_WENT_WRONG,
    })
  }
}
