import path from 'path'
import { type Context } from 'hono'
import Jimp from 'jimp'

import {
	LATO_BLACK_32_GREEN,
	LATO_BLACK_32_WHITE,
	LATO_BLACK_35_WHITE,
	LATO_BLACK_125_ORANGE,
} from '../../../../public/assets/fonts'

class Create {
	async Jimp(c: Context): Promise<Response> {
		const {
			code,
			title,
			packaging,
			price,
			productImage,
		}: {
			code: string
			title: string
			packaging: string
			price: string
			productImage: string
		} = await c.req.json()

		const base = await Jimp.read(
			path.join('public', 'assets', 'images', 'base.png'),
		)
		const sales = await Jimp.read(
			path.join('public', 'assets', 'images', 'sales', 'fim-de-semana.png'),
		)
		const product = await Jimp.read(productImage)

		product.contain(400, 375)
		base.composite(product, 100, 758)

		sales.contain(563, 343)
		base.composite(sales, 318, 13)

		base.print(
			await Jimp.loadFont(LATO_BLACK_35_WHITE),
			550,
			758,
			{
				text: title, // 20
				alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
				alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
			},
			552,
			320,
		)

		base.print(
			await Jimp.loadFont(LATO_BLACK_32_WHITE),
			550,
			1061,
			{
				text: packaging, // 13
				alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
				alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
			},
			550,
			69,
		)

		const fontUND = await Jimp.loadFont(LATO_BLACK_32_GREEN)

		base.print(
			await Jimp.loadFont(LATO_BLACK_125_ORANGE),
			100,
			1212,
			{
				text: `R$${price}`,
				alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
				alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
			},
			1002,
			150,
		)

		base.print(
			fontUND,
			100,
			1173,
			{
				text: 'APENAS',
				alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
				alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
			},
			1002,
			48,
		)

		base.print(
			fontUND,
			100,
			1362,
			{
				text: 'A UNIDADE',
				alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
				alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
			},
			1002,
			48,
		)

		base.write(path.join('public', 'assets', 'images', `${code}.png`))

		return c.json(
			{
				message: 'The image has been created!',
			},
			201,
		)
	}
}

export default new Create()
