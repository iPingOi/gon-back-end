import { type Context } from 'hono'

class Create {
  async Create (c: Context): Promise<Response> {
    const { enrollment, password } = await c.req.json()

    return c.json({
      enrollment,
      password
    })
  }
}

export default new Create()
