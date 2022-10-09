import { Request, Response } from "express"
import { UsersProfileModel } from "../../models"
import { StatusCodes, Errors, RESPONSE_TYPES } from "../../types"

export const getUserProfileDataController = async (
  req: Request,
  res: Response
) => {
  const { userId } = req.params

  try {
    const profileData = await UsersProfileModel.findOne({
      where: { userId },
    })
    if (!profileData) {
      return res.status(StatusCodes.NOT_FOUND).send({
        type: RESPONSE_TYPES.ERROR,
        errorMessage: Errors.USER_NOT_FOUND,
      })
    }
    return res.status(StatusCodes.OK).send({
      type: RESPONSE_TYPES.SUCCESS,
      profileData,
    })
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      type: RESPONSE_TYPES.ERROR,
      errorMessage: Errors.SOMETHING_WENT_WRONG,
    })
  }
}
