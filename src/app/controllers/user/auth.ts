import { prisma } from '@/utils/prisma'
import { type Context } from 'hono'
import { sign, verify } from 'hono/jwt'

interface UserProps {
  enrollment: string
  password: string
}

class Auth {
  async Execute(c: Context): Promise<Response> {
    const { enrollment, password }: UserProps = await c.req.json()

    const user = await prisma.user.findUnique({ where: { enrollment } })

    const token = await sign({
      id: user?.id,
      role: user?.role
    }, process.env.JWT_SECRET!, 'HS384')

    return c.json({
      id: user?.id,
      name: user?.name,
      role: user?.role,
      token
    }, 201)
  }
}

export default new Auth()
