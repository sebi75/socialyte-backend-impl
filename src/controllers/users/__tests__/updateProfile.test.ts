import { updateUserProfileController } from "../updateUserProfileController"

describe.skip("UpdateUserProfile test", async () => {
  it("should update user profile", async () => {
    const req = {
      headers: {
        authorization: "token",
      },
      body: {
        profilePicture: "picture",
        bio: "bio",
        interests: ["interests"],
        country: "country",
        city: "city",
      },
    }

    const { res, send } = mockResponse()

    //@ts-ignore
    await updateUserProfileController(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(send).toHaveBeenCalledWith({
      type: "success",
      user: {
        profilePicture: "picture",
        bio: "bio",
        interests: ["interests"],
        country: "country",
        city: "city",
      },
    })
  })
})

function mockResponse() {
  const send = jest.fn()
  const status = jest.fn(() => ({ send }))
  return { res: { status }, send, status }
}
