import { Request, Response } from "express"
import { Errors, RESPONSE_TYPES, StatusCodes } from "../../types"

import { ConnectionsModel, UsersModel, UsersProfileModel } from "../../models"
import { logger } from "../../utils"

export const getFollowingsController = async (req: Request, res: Response) => {
  const { userId } = req.body

  if (!userId) {
    return res.status(StatusCodes.BAD_REQUEST).send({
      type: RESPONSE_TYPES.ERROR,
      errorMessage: Errors.INVALID_CREDENTIALS,
    })
  }
  try {
    const followings = await ConnectionsModel.findAll({
      where: {
        followingId: userId,
      },
      include: [
        {
          model: UsersModel,
          as: "following",
          attributes: ["email", "username", "createdAt", "userId"],
          include: [
            {
              model: UsersProfileModel,
              attributes: ["bio", "country", "city"],
              as: "userData",
            },
          ],
        },
      ],
    })
    return res.status(StatusCodes.OK).send({
      type: RESPONSE_TYPES.SUCCESS,
      followings,
    })
  } catch (error) {
    logger.error(
      `Failed to retrieve followings for user: ${userId} with error: ${error}`
    )
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      type: RESPONSE_TYPES.ERROR,
      errorMessage: Errors.SOMETHING_WENT_WRONG,
    })
  }
}
