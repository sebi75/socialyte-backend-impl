import { Request, Response } from "express"
import { ConnectionsModel } from "../../models"
import { logger } from "../../utils"

export const followUserController = async (req: Request, res: Response) => {
  const { userId, followUserId } = req.body
  if (!userId || !followUserId) {
    return res.status(400).send({
      type: "error",
      errorMessage: "No userId or followUserId provided",
    })
  }

  try {
    const connection = await ConnectionsModel.create({
      followerId: userId,
      followingId: followUserId,
    })

    return res.status(200).send({
      type: "success",
      connection,
    })
  } catch (error) {
    logger.error(`Following user failed: ${error}`)
    return res.status(500).send({
      type: "error",
      errorMessage: "Something went wrong",
    })
  }
}
