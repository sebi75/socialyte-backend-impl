import { IUsersProfileModel, UsersProfileModel } from "../../models"
import { Request, Response } from "express"
import jwt from "jsonwebtoken"

import { JwtPayload } from "../../types"
import { logger } from "../../utils"

import { Errors, RESPONSE_TYPES, StatusCodes } from "../../types"

interface UpdatingFields {
  profilePicture?: string
  bio?: string
  interests?: Array<string>
  country?: string
  city?: string
}

export const updateUserProfileController = async (
  req: Request,
  res: Response
) => {
  const data: jwt.JwtPayload = jwt.decode(
    req.headers.authorization as string
  ) as jwt.JwtPayload

  if (!data) {
    return res.status(StatusCodes.BAD_REQUEST).send({
      type: RESPONSE_TYPES.ERROR,
      message: Errors.INVALID_TOKEN,
    })
  }

  const { userId } = data as JwtPayload

  const user = (await UsersProfileModel.findOne({
    where: { userId },
  })) as IUsersProfileModel

  const updatingFields = req.body as UpdatingFields
  try {
    await user.update(updatingFields)

    return res.status(StatusCodes.OK).send({
      type: RESPONSE_TYPES.SUCCESS,
      user,
    })
  } catch (error) {
    logger.error(`Updating user profile failed: ${error}`)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      type: RESPONSE_TYPES.ERROR,
      message: Errors.SOMETHING_WENT_WRONG,
    })
  }
}
