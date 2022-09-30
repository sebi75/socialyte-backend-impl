import request from "supertest"
import express from "express"
import { helloController } from "../controllers/helloController"

const app = express()
app.get("/test", helloController)

describe("test with supertest request", () => {
  it("should receive 'Hello world' in res", async () => {
    const res = await request(app).get("/test")

    expect(res.header["content-type"]).toBe("text/html; charset=utf-8")
    expect(res.status).toBe(200)
    expect(JSON.parse(res.text).message).toBe("Hello world")
  })
})
