import { signupController } from "../signupController"
import { userModelFactory } from "../../../helpers/factories/user"
import { Methods } from "../../../helpers/types"

let users = userModelFactory(5)

describe("signupController", () => {
  it("should successfully sign a user up", async () => {
    const req = {
      body: {
        email: users[0].email,
        password: users[0].password,
        username: users[0].username,
      },
      headers: {
        "Content-Type": "application/json",
      },
      method: Methods.POST,
    }

    const { res, send } = mockResponse()
    //@ts-ignore
    await signupController(req, res)

    console.log(send.mock.calls[0][0])
  })
})

function mockResponse() {
  const send = jest.fn()
  const status = jest.fn(() => ({ send }))
  return { res: { status }, send, status }
}
