import { signupController } from "../signupController"
import { userModelFactory } from "../../../helpers/factories/user"
import { Methods } from "../../../helpers/types"
import truncate from "../../../scripts/db/truncate"
import { UsersModel } from "../../../models"
import { encryptPassword } from "../../../utils/encryptPassword"

let users = userModelFactory(5)

describe("signupController", () => {
  beforeEach(async () => {
    //I tried in the setupTests beforeAll, but for some reason it crashes and doesn't work.
    //TODO: figure out why after all the tests are ran, an error is displayed in the console: ***ConnectionManager.getConnection was called after the connection manager was closed!***
    await truncate()
  })

  it("should successfully sign a user up and return error if signing already existent user", async () => {
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

    expect(send.mock.calls[0][0].type).toBe("success")
    //@ts-ignore
    await signupController(req, res)
    expect(send.mock.calls[1][0].type).toBe("error")
    expect(send.mock.calls[1][0].errorMessage).toBe("User already exists")
  })

  it("should successfully sign up a user and find him/her in the database with the right data saved", async () => {
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
    const userFromDb = await UsersModel.findOne({
      where: {
        email: req.body.email,
      },
    })

    const encryptedPassword = encryptPassword(req.body.password)

    expect(userFromDb?.email).toEqual(req.body.email)
    expect(userFromDb?.username).toEqual(req.body.username)
    expect(userFromDb?.hashed_password).toEqual(encryptedPassword)
  })
})

function mockResponse() {
  const send = jest.fn()
  const status = jest.fn(() => ({ send }))
  return { res: { status }, send, status }
}
