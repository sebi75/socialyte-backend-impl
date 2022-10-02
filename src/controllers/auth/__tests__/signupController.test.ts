import { signupController } from "../signupController"
import { userModelFactory } from "../../../helpers/factories/user"
import { Methods } from "../../../helpers/types"
import truncate from "../../../scripts/db/truncate"

let users = userModelFactory(5)

describe("signupController", () => {
  beforeAll(async () => {
    //put this way up here so that the database is truncated before the tests run
    //I tried in the setupTests beforeAll, but for some reason it crashes and doesn't work.
    //TODO: figure out why after all the tests are ran, an error is displayed in the console: ***ConnectionManager.getConnection was called after the connection manager was closed!***
    await truncate()
  })

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
