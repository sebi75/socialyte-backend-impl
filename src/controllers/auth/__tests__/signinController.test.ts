require("iconv-lite").encodingExists("foo")
import { signupController } from "../signupController"
import { signinController } from "../signinController"
import { userModelFactory } from "../../../helpers/factories/user"
import { Methods } from "../../../helpers/types"
import truncate from "../../../scripts/db/truncate"

let users = userModelFactory(5)

describe("signinController", () => {
  afterAll(async () => {
    await truncate()
  })

  beforeAll(async () => {
    const req = {
      body: {
        email: "",
        password: "",
        username: "",
      },
      method: Methods.POST,
    }

    for (const user of users) {
      req.body.email = user.email
      req.body.password = user.password
      req.body.username = user.username

      const { res, send } = mockResponse()
      //@ts-ignore
      await signupController(req, res)
      expect(send.mock.calls[0][0].type).toBe("success")
    }
  })

  it("should successfully sign a user in", async () => {
    const { res, send } = mockResponse()
    const req = {
      body: {
        email: "",
        password: "",
      },
      headers: {
        "Content-Type": "application/json",
      },
      method: Methods.POST,
    }

    for (const user of users) {
      req.body.email = user.email
      req.body.password = user.password
      //@ts-ignore
      await signinController(req, res)
      expect(send.mock.calls[0][0].type).toBe("success")
      expect(send.mock.calls[0][0].token).toBeTruthy()
    }
  })

  it("should send back error when making a request without an email/password", async () => {
    const req = {
      body: {
        email: null,
        password: null,
      },
      headers: {
        "Content-Type": "application/json",
      },
      method: Methods.POST,
    }

    const { res, send } = mockResponse()
    //abstract validation for now and test if it throws an error only if there isn't any email/password
    //@ts-ignore
    await signinController(req, res)
    expect(send.mock.calls[0][0].error).toBe("ENOENTUSER")
  })
})

function mockResponse() {
  const send = jest.fn()
  const status = jest.fn(() => ({ send }))
  return { res: { status }, send, status }
}
