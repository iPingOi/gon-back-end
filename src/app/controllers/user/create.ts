import { prisma } from '@/utils/prisma'
import * as argon2 from 'argon2'
import { type Context } from 'hono'

interface UserProps {
  enrollment: string
  name: string
  username: string
  email: string
  password: string
}

class Create {
  async Execute(c: Context): Promise<Response> {
    const { enrollment, name, username, email, password }: UserProps = await c.req.json()

    await prisma.user.create({
      data: {
        enrollment,
        name,
        username,
        email,
        password: await argon2.hash(password)
      }
    })

    return c.json({
      message: 'The user has been created!'
    }, 201)
  }
}

export default new Create()
