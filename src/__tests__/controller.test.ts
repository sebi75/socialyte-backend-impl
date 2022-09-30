import { helloController } from "../controllers/helloController"
import { Methods } from "../helpers/types"

describe("Hello test suite", () => {
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
