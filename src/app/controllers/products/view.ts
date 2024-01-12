import { prisma } from '@/utils/prisma'

import { type Context } from 'hono'

class Products {
	async View(c: Context): Promise<Response> {
		const { id } = c.req.param()

		const findByCode = await prisma.product.findUnique({
			where: {
				code: id,
			},
		})

		return c.json(findByCode)
	}
}

export default new Products()
