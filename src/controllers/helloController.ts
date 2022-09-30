import { Response, Request } from "express"

export const helloController = (req: Request, res: Response) => {
  res.status(200).send(JSON.stringify({ message: "Hello world" }))
}
