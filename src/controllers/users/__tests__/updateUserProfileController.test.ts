import { updateUserProfileController } from "../updateUserProfileController"
import truncate from "../../../scripts/db/truncate"
import { userModelFactory } from "../../../helpers/factories/user"

import { signupController } from "../../auth/signupController"

import { UsersModel } from "../../../models"
import { Methods } from "../../../helpers/types"

describe("updateUserProfileController", () => {
  let token: string
  let userEmail: string
  beforeEach(async () => {
    //signup a user
    const user = userModelFactory(1)[0]
    const req = {
      method: Methods.POST,
      body: {
        email: user.email,
        password: user.password,
        username: user.username,
      },
    }
    userEmail = user.email
    const { res, send } = mockResponse()
    //@ts-ignore
    await signupController(req, res)
    token = send.mock.calls[0][0].token
  })

  it("should update user profile data when provided all valid data", async () => {
    const req = {
      headers: {
        authorization: token,
      },
      body: {
        profilePicture: "picture",
        bio: "bio",
        country: "country",
        city: "city",
      },
    }

    const userDataBeforeUpdate = await UsersModel.findOne({
      where: {
        email: userEmail,
      },
    })

    const { res, send } = mockResponse()

    //@ts-ignore
    await updateUserProfileController(req, res)
    expect(send.mock.calls[0][0].type).toBe("success")
    const userDataAfterUpdate = send.mock.calls[0][0].user.dataValues
    //expect(userDataAfterUpdate.profilePicture).toBe("picture") //TODO: add profilePicture in model when I handle Blob types
    expect(userDataAfterUpdate.bio).toBe("bio")
    expect(userDataAfterUpdate.country).toBe("country")
    expect(userDataAfterUpdate.city).toBe("city")
    expect(userDataAfterUpdate.userId).toBe(userDataBeforeUpdate?.userId)
  })

  it("should not update the profile of a user that has an invalid token", async () => {
    const req = {
      headers: {
        authorization: "dfp348gfpre98dv6ew9dv6cd97x",
      },
      body: {
        profilePicture: "picture",
        bio: "bio",
        country: "country",
        city: "city",
      },
    }

    const { res, send } = mockResponse()

    //@ts-ignore
    await updateUserProfileController(req, res)
    expect(send.mock.calls[0][0].type).toBe("error")
  })

  afterAll(async () => {
    await truncate()
  })
})

function mockResponse() {
  const send = jest.fn()
  const status = jest.fn(() => ({ send }))
  return { res: { status }, send, status }
}
