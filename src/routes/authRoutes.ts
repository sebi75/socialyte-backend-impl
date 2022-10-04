import express from "express"

import { signupController, signinController } from "../controllers"

import {
  validatorMiddleware,
  zodSigninValidator,
  zodSignupValidator,
} from "../helpers"

const auth = express.Router()

auth.post(
  "/auth/signup",
  validatorMiddleware(zodSignupValidator),
  signupController
)
auth.post(
  "/auth/signin",
  validatorMiddleware(zodSigninValidator),
  signinController
)

export default auth
