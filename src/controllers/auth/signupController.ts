import { Request, Response } from "express"
import { UsersModel } from "../../models"
import { encryptPassword } from "../../utils/encryptPassword"

export const signupController = async (req: Request, res: Response) => {
  const userExists = await UsersModel.findOne({
    where: {
      email: req.body.email,
    },
  })
  if (userExists) {
    return res.status(400).send({
      type: "error",
      error: "User already exists",
    })
  }

  const hashedPassword = encryptPassword(req.body.password)
  try {
    await UsersModel.create({
      email: req.body.email,
      hashed_password: hashedPassword,
      username: req.body.username,
    })
  } catch (error) {}
}
