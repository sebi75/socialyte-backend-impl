import { encryptPassword } from "../../utils/encryptPassword"
import { Request, Response } from "express"
import { UsersModel } from "../../models"

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
    return res.status(200).send({
      message: "Signed in successfully",
    })
  } else {
    return res.status(400).send({
      error: "EINCORRECTPASSWORD",
      message: "Invalid password",
    })
  }
}
