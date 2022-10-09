import { Request, Response, NextFunction } from "express"
import { ConnectionsModel } from "../../../models"
import { Errors, RESPONSE_TYPES, StatusCodes } from "../../../types"
import { logger } from "../../../utils"

export const unfollowableMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, unfollowUserId } = req.body
  if (!userId || unfollowUserId) {
    return res.status(StatusCodes.BAD_REQUEST).send({
      type: RESPONSE_TYPES.ERROR,
      errorMessage: Errors.INVALID_CREDENTIALS,
    })
  }

  try {
    const connection = await ConnectionsModel.findOne({
      where: {
        followerId: userId,
        followingId: unfollowUserId,
      },
    })

    if (!connection) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        type: RESPONSE_TYPES.ERROR,
        errorMessage: Errors.NOT_FOLLOWING,
      })
    }
    return next()
  } catch (error) {
    logger.error(`Error in unfollowableMiddleware: ${error}`)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      type: RESPONSE_TYPES.ERROR,
      errorMessage: Errors.SOMETHING_WENT_WRONG,
    })
  }
}
