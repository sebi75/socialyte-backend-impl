import express from "express"

import { signupController } from "../controllers/auth/signupController"
import { signinController } from "../controllers/auth/signinController"

const auth = express.Router()

auth.post("/auth/signup", signupController)
auth.post("/auth/signin", signinController)

export default auth
