require("iconv-lite").encodingExists("foo")
import { updateUserProfileController } from "../updateUserProfileController"
import truncate from "../../../scripts/db/truncate"
import { userModelFactory } from "../../../helpers/factories/user"

import { signupController } from "../../auth/signupController"
import { getUserController } from "../getUserController"
import jwt from "jsonwebtoken"

import { Methods } from "../../../helpers/types"

import request from "supertest"
import { setAssociations } from "../../../models"
import express from "express"

const app = express()
app.get("/users/:userId/:includeProfile?", getUserController)

describe("getUserController", () => {
  afterAll(async () => {
    await truncate()
  })

  let tokenArr: string[] = []
  beforeAll(async () => {
    setAssociations()
    let users = userModelFactory(5)
    //sign up 5 users
    const req = {
      body: {
        email: "",
        password: "",
        username: "",
      },
      method: Methods.POST,
    }
    for (let user of users) {
      req.body.email = user.email
      req.body.password = user.password
      req.body.username = user.username
      const { res, send } = mockResponse()
      //@ts-ignore
      await signupController(req, res)
      tokenArr.push(send.mock.calls[0][0].token)
    }
  })

  it("should successfully get a user", async () => {
    for (let token of tokenArr) {
      const decoded: jwt.JwtPayload = jwt.decode(token) as jwt.JwtPayload

      const userId: string = decoded?.userId
      const response = await request(app).get(`/users/${userId}/includeProfile`)

      expect(response.status).toBe(200)
      const parsedResponse = JSON.parse(response.text)
      expect(parsedResponse.type).toBe("success")
      expect(parsedResponse.user.userData.createdAt).toBeTruthy()
    }
  })

  it("should respond with error when getting non-existent user", async () => {
    const response = await request(app).get("/users/1234")
    expect(response.status).toBe(404)
    const parsedResponse = JSON.parse(response.text)
    expect(parsedResponse.type).toBe("error")
    expect(parsedResponse.errorMessage).toBe("User not found")
  })
})

function mockResponse() {
  const send = jest.fn()
  const status = jest.fn(() => ({ send }))
  return { res: { status }, send, status }
}
