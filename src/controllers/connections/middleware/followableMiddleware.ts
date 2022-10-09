import { Request, Response, NextFunction } from "express"
import { Errors, RESPONSE_TYPES, StatusCodes } from "../../../types"
import { ConnectionsModel } from "../../../models"
import { logger } from "../../../utils"

export const followableMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, followUserId } = req.body

  if (!userId || !followUserId) {
    return res.status(StatusCodes.BAD_REQUEST).send({
      type: RESPONSE_TYPES.ERROR,
      errorMessage: Errors.INVALID_CREDENTIALS,
    })
  }

  try {
    const connection = await ConnectionsModel.findOne({
      where: {
        followerId: userId,
        followingId: followUserId,
      },
    })
    if (!connection) {
      return next()
    }
    return res.status(StatusCodes.BAD_REQUEST).send({
      type: RESPONSE_TYPES.ERROR,
      errorMessage: Errors.ALREADY_FOLLOWING,
    })
  } catch (error) {
    logger.error(`Error in followableMiddleware: ${error}`)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      type: RESPONSE_TYPES.ERROR,
      errorMessage: Errors.SOMETHING_WENT_WRONG,
    })
  }
}
