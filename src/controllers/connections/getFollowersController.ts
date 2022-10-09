import { Request, Response } from "express"

import { ConnectionsModel, UsersModel, UsersProfileModel } from "../../models"
import { logger } from "../../utils"

import { Errors, RESPONSE_TYPES, StatusCodes } from "../../types"

export const getFollowersController = async (req: Request, res: Response) => {
  const { userId } = req.params

  if (!userId) {
    return res.status(StatusCodes.BAD_REQUEST).send({
      type: RESPONSE_TYPES.ERROR,
      errorMessage: Errors.INVALID_CREDENTIALS,
    })
  }

  try {
    const followers = await ConnectionsModel.findAll({
      where: { followingId: userId },
      attributes: [],
      include: [
        {
          model: UsersModel,
          as: "follower",
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
      followers,
    })
  } catch (error) {
    logger.error(`Getting followers failed: ${error}`)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      type: RESPONSE_TYPES.ERROR,
      errorMessage: Errors.SOMETHING_WENT_WRONG,
    })
  }
}
