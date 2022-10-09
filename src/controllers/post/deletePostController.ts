import { Request, Response } from "express"
import { PostsModel } from "../../models"
import { Errors, RESPONSE_TYPES, StatusCodes } from "../../types"

export const deletePostController = async (req: Request, res: Response) => {
  const { postId } = req.params

  try {
    const deletedPost = await PostsModel.destroy({
      where: { postId },
    })
    if (deletedPost) {
      return res.status(StatusCodes.OK).send({
        type: RESPONSE_TYPES.SUCCESS,
        data: deletedPost,
      })
    }
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      type: RESPONSE_TYPES.ERROR,
      errorMessage: Errors.SOMETHING_WENT_WRONG,
    })
  }
}
