import { Request, Response, NextFunction } from "express"
import { StatusCodes, Errors, RESPONSE_TYPES, JwtPayload } from "../../../types"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { logger } from "../../../utils"
dotenv.config()

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.headers.authorization
  if (!authToken) {
    return res.status(StatusCodes.UNAUTHORIZED).send({
      type: RESPONSE_TYPES.ERROR,
      error: Errors.UNAUTHORIZED,
    })
  }

  try {
    jwt.verify(authToken, process.env.JWT_SECRET as string)
    return next()
  } catch (error) {
    logger.error(`Someone tried to use an invalid token`)
    return res.status(StatusCodes.UNAUTHORIZED).send({
      type: RESPONSE_TYPES.ERROR,
      error: Errors.UNAUTHORIZED,
    })
  }
}
