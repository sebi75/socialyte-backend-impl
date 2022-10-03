import zod, { AnyZodObject } from "zod"
import { Request, Response, NextFunction } from "express"
import { logger } from "../../utils"

/* 
****
****
this is going to be some basic validation without any crazy explanatory messages for now
****
****
*/

export const zodSignupValidator = zod.object({
  email: zod.string().email("Invalid email address"),
  password: zod.string().min(6).max(25),
  username: zod.string().min(3).max(15),
})

export const zodSigninValidator = zod.object({
  email: zod.string().email("Invalid email address"),
  password: zod.string().min(6).max(25),
})

export const validatorMiddleware =
  (zodSchema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await zodSchema.parseAsync(req.body)
      return next()
    } catch (error: any) {
      return res.status(400).send({
        type: "error",
        message: error,
      })
    }
  }
