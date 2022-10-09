import { Request, Response, NextFunction } from "express"
import { LikesModel } from "../../../models"
import { Errors, JwtPayload, RESPONSE_TYPES, StatusCodes } from "../../../types"
import { logger } from "../../../utils"
import jwt from "jsonwebtoken"

export const isUnlikeablePostMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { postId } = req.params

  const token: string = req.headers.authorization as string
  const tokenPayload = jwt.decode(token) as JwtPayload
  const { email, userId } = tokenPayload

  req.body.email = email
  req.body.userId = userId

  try {
    const isLikedPost = await LikesModel.findOne({
      where: {
        postId: postId,
        userId: userId,
      },
    })
    if (isLikedPost) {
      return next()
    }
    return res.status(StatusCodes.BAD_REQUEST).send({
      type: RESPONSE_TYPES.ERROR,
      errorMessage: Errors.NOT_LIKED,
    })
  } catch (error) {
    logger.error(`Error in isUnlikeablePostMiddleware with error: ${error}`)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      type: RESPONSE_TYPES.ERROR,
      errorMessage: Errors.SOMETHING_WENT_WRONG,
    })
  }
}
