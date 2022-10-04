import { Request, Response } from "express"
import { UsersModel, UsersProfileModel } from "../../models"
import { logger } from "../../utils"

export const getUserController = async (req: Request, res: Response) => {
  const { userId, includeProfile } = req.params
  console.log("*******")
  console.log({ userId, includeProfile })
  console.log("*******")
  if (!userId) {
    return res.status(400).send({
      type: "error",
      errorMessage: "No userId provided",
    })
  }

  try {
    const user = await UsersModel.findOne({
      where: { userId },
      include: includeProfile ? UsersProfileModel : [],
    })

    if (!user) {
      return res.status(404).send({
        type: "error",
        errorMessage: "User not found",
      })
    }

    return res.status(200).send({
      type: "success",
      user,
    })
  } catch (error) {
    logger.error(`Getting user failed: ${error}`)
    return res.status(500).send({
      type: "error",
      errorMessage: "Something went wrong",
    })
  }
}
