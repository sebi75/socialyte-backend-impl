import express from "express"

import { signupController } from "../controllers/auth/signupController"
import { signinController } from "../controllers/auth/signinController"

import { signupValidatorMiddleware } from "../helpers/validation/validators"

const auth = express.Router()

auth.post("/auth/signup", signupValidatorMiddleware, signupController)
auth.post("/auth/signin", signinController)

export default auth
