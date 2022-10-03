import { Request, Response } from "express"
import { UsersModel, UsersProfileModel } from "../../models"
import { encryptPassword } from "../../utils/encryptPassword"
import { logger } from "../../utils"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const signupController = async (req: Request, res: Response) => {
  const { email, password, username } = req.body

  const userExists = await UsersModel.findOne({
    where: {
      email: email,
    },
  })

  if (userExists) {
    return res.status(400).send({
      type: "error",
      errorMessage: "User already exists",
    })
  }

  const hashedPassword = encryptPassword(password)
  try {
    const user = await UsersModel.create({
      email: email,
      hashed_password: hashedPassword,
      username: username,
    })
    const usersProfile = await UsersProfileModel.create({
      userId: user.userId,
    })

    logger.info(`New user created with email: ${email}`)
    //generate token at successfull signup so the user doesn't have to manually signin right after
    const token = jwt.sign(
      { email: user.email, userId: user.userId },
      process.env.JWT_SECRET as string,
      { expiresIn: "12h" }
    )

    return res.status(200).send({
      type: "success",
      message: "User created successfully",
      token,
    })
  } catch (error) {
    logger.error(`Error creating user: ${error}`)
    return res.status(400).send({
      type: "error",
      error: "Error creating user",
    })
  }
}
