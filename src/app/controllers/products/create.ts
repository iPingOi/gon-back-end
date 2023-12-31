import { prisma } from '@/utils/prisma'
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
        packaging
      }
    })

    return c.json({
      message: 'The product has been created!'
    }, 201)
  }
}

export default new Create()
