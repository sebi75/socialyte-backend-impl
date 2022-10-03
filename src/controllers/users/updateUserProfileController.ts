import { IUsersProfileModel, UsersProfileModel } from "../../models"
import { Request, Response } from "express"
import jwt from "jsonwebtoken"

import { JwtPayload } from "../../types"
import { logger } from "../../utils"

interface UpdatingFields {
  profilePicture?: string
  bio?: string
  interests?: Array<string>
  country?: string
  city?: string
}

//is the user gets here we know the token is valid and so has the valid information about him: userId and email
export const updateUserProfileController = async (
  req: Request,
  res: Response
) => {
  const data: jwt.JwtPayload = jwt.decode(
    req.headers.authorization as string
  ) as jwt.JwtPayload

  if (!data) {
    return res.status(400).send({
      type: "error",
      message: "Invalid token",
    })
  }

  const { userId } = data as JwtPayload

  const user = (await UsersProfileModel.findOne({
    where: { userId },
  })) as IUsersProfileModel

  const updatingFields = req.body as UpdatingFields
  try {
    await user.update(updatingFields)
    //send the whole user object back when it is successfully updated
    return res.status(200).send({
      type: "success",
      user: {
        ...user,
      },
    })
  } catch (error) {
    logger.error(`Updating user profile failed: ${error}`)
    return res.status(500).send({
      type: "error",
      message: "Updating user profile failed",
    })
  }
}
