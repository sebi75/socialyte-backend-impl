import { Request, Response } from "express"
import { ConnectionsModel } from "../../models"
import { logger } from "../../utils"

import { Errors, RESPONSE_TYPES, StatusCodes } from "../../types"

export const followUserController = async (req: Request, res: Response) => {
  const { userId, followUserId } = req.body
  if (!userId || !followUserId) {
    return res.status(StatusCodes.BAD_REQUEST).send({
      type: RESPONSE_TYPES.ERROR,
      errorMessage: Errors.INVALID_CREDENTIALS,
    })
  }

  try {
    const connection = await ConnectionsModel.create({
      followerId: userId,
      followingId: followUserId,
    })

    return res.status(StatusCodes.OK).send({
      type: RESPONSE_TYPES.SUCCESS,
      connection,
    })
  } catch (error) {
    logger.error(`Following user failed: ${error}`)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      type: RESPONSE_TYPES.ERROR,
      errorMessage: Errors.SOMETHING_WENT_WRONG,
    })
  }
}
