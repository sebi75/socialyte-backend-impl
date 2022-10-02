import { encryptPassword } from "../../utils/encryptPassword"
import { Request, Response } from "express"
import { UsersModel } from "../../models"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { logger } from "../../utils"
dotenv.config()

export const signinController = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const user = await UsersModel.findOne({
    where: {
      email,
    },
  })

  if (!user) {
    return res.status(400).send({
      error: "ENOENTUSER",
      message: "User doesn't exist",
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
    return res.status(200).send({
      type: "success",
      message: "Signed in successfully",
      token,
    })
  } else {
    return res.status(400).send({
      error: "EINCORRECTPASSWORD",
      message: "Invalid password",
    })
  }
}
