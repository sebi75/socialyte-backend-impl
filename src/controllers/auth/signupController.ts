import { Request, Response } from "express"
import { UsersModel, UsersProfileModel } from "../../models"
import { encryptPassword } from "../../utils/encryptPassword"
import { logger } from "../../utils"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

import { StatusCodes, Errors, RESPONSE_TYPES } from "../../types/"

dotenv.config()

export const signupController = async (req: Request, res: Response) => {
  const { email, password, username } = req.body

  const userExists = await UsersModel.findOne({
    where: {
      email: email,
    },
  })

  if (userExists) {
    return res.status(StatusCodes.BAD_REQUEST).send({
      type: "error",
      errorMessage: Errors.USER_ALREADY_EXISTS,
    })
  }

  const hashedPassword = encryptPassword(password)
  try {
    const user = await UsersModel.create({
      email: email,
      hashed_password: hashedPassword,
      username: username,
    })

    await UsersProfileModel.create({
      userId: user.userId,
      bio: "",
      city: "",
      country: "",
    })

    logger.info(`New user created with email: ${email}`)
    const token = jwt.sign(
      { email: user.email, userId: user.userId },
      process.env.JWT_SECRET as string,
      { expiresIn: "12h" }
    )

    return res.status(StatusCodes.OK).send({
      type: RESPONSE_TYPES.SUCCESS,
      token,
    })
  } catch (error) {
    logger.error(`Error creating user: ${error}`)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      type: RESPONSE_TYPES.ERROR,
      errorMessage: Errors.SOMETHING_WENT_WRONG,
    })
  }
}
