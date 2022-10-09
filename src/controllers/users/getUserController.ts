import { Request, Response } from "express"
import { UsersModel, UsersProfileModel } from "../../models"
import { logger } from "../../utils"

import { StatusCodes, Errors, RESPONSE_TYPES } from "../../types/"

export const getUserController = async (req: Request, res: Response) => {
  const { username } = req.params
  const includeProfile = req.query.includeProfile as string

  if (!username) {
    return res.status(StatusCodes.BAD_REQUEST).send({
      type: RESPONSE_TYPES.ERROR,
      errorMessage: Errors.NO_USERNAME_PROVIDED,
    })
  }

  try {
    let user
    if (stringToBoolean(includeProfile)) {
      user = await UsersModel.findOne({
        where: { username },
        include: [
          {
            model: UsersProfileModel,
            as: "userData",
          },
        ],
      })
    } else {
      user = await UsersModel.findOne({
        where: { username },
      })
    }

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).send({
        type: RESPONSE_TYPES.ERROR,
        errorMessage: Errors.USER_NOT_FOUND,
      })
    }

    return res.status(StatusCodes.OK).send({
      type: RESPONSE_TYPES.SUCCESS,
      user,
    })
  } catch (error) {
    logger.error(`Getting user failed: ${error}`)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      type: RESPONSE_TYPES.ERROR,
      errorMessage: Errors.SOMETHING_WENT_WRONG,
    })
  }
}

const stringToBoolean = (string: string | undefined): boolean => {
  switch (string) {
    case "true":
      return true
    case "false":
      return false
    default:
      return false
  }
}
