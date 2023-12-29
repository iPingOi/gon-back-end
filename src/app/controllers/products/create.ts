import { prisma } from '@/utils/prisma'
import * as argon2 from 'argon2'
import { type Context } from 'hono'

interface UserProps {
  code: string
  name: string
  image: string
  packaging: string
}

class Create {
  async Execute(c: Context): Promise<Response> {
    const { code, image, name, packaging }: UserProps = await c.req.json()

    await prisma.product.create({
      data: {
        code,
        image,
        name,
        packaging,
        author: {
          connect: {
            id: '038972ba-d361-4f1d-b0f9-3127aac90651'
          }
        }
      }
    })

    return c.json({
      message: 'The product has been created!'
    }, 201)
  }
}

export default new Create()
