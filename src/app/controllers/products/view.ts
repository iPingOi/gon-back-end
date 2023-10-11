import { prisma } from '@/utils/prisma'

import { type Context } from 'hono'

class Products {
  async View (c: Context): Promise<{
    id: string
    code: string
    internalCode: string
    name: string
    packaging: string
    image: string
    createdAt: Date
    updatedAt: Date
  } | null> {
    const { id } = c.req.param()

    const findByCode = await prisma.product.findUnique({
      where: {
        code: id
      }
    })

    return findByCode
  }
}

export default new Products()
