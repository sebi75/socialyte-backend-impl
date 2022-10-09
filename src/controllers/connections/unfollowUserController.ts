import { Errors, RESPONSE_TYPES, StatusCodes } from "../../types"
import { Request, Response } from "express"
import { ConnectionsModel } from "../../models"

export const unfollowUserController = async (req: Request, res: Response) => {
  const { userId, unfollowUserId } = req.body

  try {
    await ConnectionsModel.destroy({
      where: {
        followerId: userId,
        followingId: unfollowUserId,
      },
    })
    return res.status(StatusCodes.OK).send({
      type: RESPONSE_TYPES.SUCCESS,
    })
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      type: RESPONSE_TYPES.ERROR,
      error: Errors.SOMETHING_WENT_WRONG,
    })
  }
}
