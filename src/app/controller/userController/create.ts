import { type Context } from 'hono'

class User {
  async Execute (c: Context): Promise<Response> {
    const body = await c.req.json()

    return c.json(body)
  }
}

export default new User()
