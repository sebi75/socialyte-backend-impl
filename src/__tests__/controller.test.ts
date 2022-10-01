import { helloController } from "../controllers/helloController"
import { Methods } from "../helpers/types"
import { getDbConfiguration } from "../config/environment"
import { Sequelize } from "sequelize"

describe("Hello test suite", () => {
  let connection: Sequelize
  beforeAll(async () => {
    const env = "test"
    const dbConfig = getDbConfiguration(env)
    connection = new Sequelize(
      `mysql://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`
    )
    await connection.authenticate()
  })

  afterAll(async () => {
    await connection.close()
  })

  it("should receive 'Hello world' in res", () => {
    const req = {
      method: Methods.GET,
    }
    const { res, send } = mockResponse()

    // @ts-ignore
    helloController(req, res)
    const response = JSON.parse(send.mock.calls[0][0])
    expect(response.message).toEqual("Hello world")
  })
})

function mockResponse() {
  const send = jest.fn()
  const status = jest.fn(() => ({ send }))
  return { res: { status }, send, status }
}
