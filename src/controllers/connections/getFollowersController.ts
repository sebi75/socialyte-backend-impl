import { Request, Response } from "express"

import { ConnectionsModel, UsersModel, UsersProfileModel } from "../../models"
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
    const followers = await ConnectionsModel.findAll({
      where: { followingId: userId },
      attributes: [],
      include: [
        {
          model: UsersModel,
          as: "follower",
          attributes: ["email", "username", "createdAt", "userId"],
          include: [
            {
              model: UsersProfileModel,
              attributes: ["bio", "country", "city"],
              as: "userData",
            },
          ],
        },
      ],
    })
    followers.map((follower) => {
      console.log(follower.toJSON())
    })
    return res.status(200).send({
      type: "success",
      followers,
    })
  } catch (error) {
    logger.error(`Getting followers failed: ${error}`)
  }
}
