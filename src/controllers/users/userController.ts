import { Response, Request } from "express"

import { IUserModel, UserModel } from "../../models/User"

export const getUsersController = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.findAll()
    res.status(200).json({ users })
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const createUsersController = async (req: Request, res: Response) => {
  try {
    for (const user of users) {
      await UserModel.create(user)
    }
    res.status(200).json({ message: "Users created" })
  } catch (error: any) {
    console.log(error)
    throw new Error(error)
  }
}

const users = [
  {
    username: "user1",
    email: "sebi@gmail.com",
  },
  {
    username: "sebsy2",
    email: "trululu@gmail.com",
  },
]
