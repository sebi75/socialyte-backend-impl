import { encryptPassword } from "../../utils/encryptPassword"
import { Request, Response } from "express"
import { UsersModel } from "../../models"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { logger } from "../../utils"

import { StatusCodes, Errors, RESPONSE_TYPES } from "../../types/"

dotenv.config()

export const signinController = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const user = await UsersModel.findOne({
    where: {
      email,
    },
  })

  if (!user) {
    return res.status(StatusCodes.BAD_REQUEST).send({
      type: RESPONSE_TYPES.ERROR,
      message: Errors.NO_USER_FOUND,
    })
  }

  const hashedPassword = encryptPassword(password)
  if (hashedPassword === user.hashed_password) {
    const token = jwt.sign(
      { email: user.email, userId: user.userId },
      process.env.JWT_SECRET as string,
      { expiresIn: "12h" }
    )

    logger.info(`User ${user.email} just logged in!`)
    return res.status(StatusCodes.OK).send({
      type: RESPONSE_TYPES.SUCCESS,
      token,
    })
  } else {
    return res.status(StatusCodes.BAD_REQUEST).send({
      type: RESPONSE_TYPES.ERROR,
      errorMessage: Errors.INVALID_PASSWORD,
    })
  }
}
