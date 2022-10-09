import { Request, Response, NextFunction } from "express"
import { Errors, RESPONSE_TYPES, StatusCodes, JwtPayload } from "../../../types"
import { LikesModel } from "../../../models"

import jwt from "jsonwebtoken"
import { logger } from "../../../utils"

export const isLikeableMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { postId } = req.params
  const token: string = req.headers.authorization as string

  const tokenPayload = jwt.decode(token) as JwtPayload
  const { email, userId } = tokenPayload

  req.body.userId = userId
  req.body.email = email

  try {
    const like = await LikesModel.findOne({
      where: {
        postId: postId,
        userId: userId,
      },
    })
    if (like) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        type: RESPONSE_TYPES.ERROR,
        errorMessage: Errors.ALREADY_LIKED,
      })
    }
    return next()
  } catch (error) {
    logger.error(`Error in isLikeableMiddleware with error: ${error}`)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      type: RESPONSE_TYPES.ERROR,
      errorMessage: Errors.SOMETHING_WENT_WRONG,
    })
  }
}
