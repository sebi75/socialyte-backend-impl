import { Request, Response } from "express"
import { PostsModel } from "../../models"
import { Errors, RESPONSE_TYPES, StatusCodes } from "../../types"
import formidable from "formidable"
import fs from "fs"
import { logger } from "../../utils"

export const createPostController = async (req: Request, res: Response) => {
  const form = formidable({ multiples: true })

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        type: RESPONSE_TYPES.ERROR,
        errorMessage: Errors.SOMETHING_WENT_WRONG,
      })
    }
    const userId = fields.userId as string
    const caption = fields.caption as string

    const file = files.media as formidable.File

    const formatMedia = fs.readFileSync(file.filepath)

    try {
      const newPost = await PostsModel.create({
        ownerId: userId,
        postCaption: caption,
        media: formatMedia,
      })
      return res.status(StatusCodes.OK).send({
        type: RESPONSE_TYPES.SUCCESS,
        data: newPost,
      })
    } catch (error) {
      logger.error(
        `Error creating a post for user: ${userId} with error: ${error}`
      )
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        type: RESPONSE_TYPES.ERROR,
        errorMessage: Errors.SOMETHING_WENT_WRONG,
      })
    }
  })
}
