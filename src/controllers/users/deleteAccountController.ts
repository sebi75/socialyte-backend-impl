import { Request, Response } from "express"
import { StatusCodes, RESPONSE_TYPES, Errors } from "../../types"
import { logger } from "../../utils"
import { UsersModel } from "../../models"

export const deleteAccountController = async (req: Request, res: Response) => {
  const { userId } = req.body

  try {
    const account = await UsersModel.findOne({
      where: {
        userId,
      },
    })
    //todo: delete all the rows that reference this userId
    await account?.destroy()

    return res.status(StatusCodes.OK).send({
      type: RESPONSE_TYPES.SUCCESS,
      data: account,
    })
  } catch (error) {
    logger.error(`Error deleting account: ${error}`)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      type: RESPONSE_TYPES.ERROR,
      error: Errors.SOMETHING_WENT_WRONG,
    })
  }
}
