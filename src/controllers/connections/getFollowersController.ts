import { Request, Response } from "express"

import { ConnectionsModel, UsersModel } from "../../models"
import { logger } from "../../utils"

export const getFollowersController = async (req: Request, res: Response) => {
  const { userId } = req.params

  if (!userId) {
    return res.status(400).send({
      type: "error",
      errorMessage: "No userId provided",
    })
  }

  try {
    const followers: any = await ConnectionsModel.findAll({
      where: { followingId: userId },
    })
    console.log(followers[0])
  } catch (error) {
    logger.error(`Getting followers failed: ${error}`)
  }
}
