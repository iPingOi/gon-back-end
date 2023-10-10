import { type Context } from 'hono'
import Jimp from 'jimp'
import path from 'path'

import { LATO_BLACK_125_ORANGE, LATO_BLACK_32_GREEN, LATO_BLACK_32_WHITE, LATO_BLACK_35_WHITE } from '@/assets/fonts'

class Create {
  async Jimp (c: Context): Promise<Response> {
    const { title, description, price, productImage }: {
      title: string
      description: string
      price: string
      productImage: string
    } = await c.req.json()

    const base = await Jimp.read(path.join('src', 'assets', 'images', 'base.png'))
    const product = await Jimp.read(productImage)

    product.contain(400, 375)
    base.composite(product, 100, 758)

    base.print(
      await Jimp.loadFont(LATO_BLACK_35_WHITE),
      550,
      758,
      {
        text: title, // 20
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
      },
      550,
      320
    )

    base.print(
      await Jimp.loadFont(LATO_BLACK_32_WHITE),
      550,
      1061,
      {
        text: description, // 13
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
      },
      550,
      69
    )

    const fontUND = await Jimp.loadFont(LATO_BLACK_32_GREEN)

    base.print(
      await Jimp.loadFont(LATO_BLACK_125_ORANGE),
      550,
      1173,
      {
        text: 'R$' + price,
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
      },
      550,
      220,
      (_err, base) => {
        base.print(
          fontUND,
          550,
          1173,
          {
            text: 'APENAS',
            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
            alignmentY: Jimp.VERTICAL_ALIGN_TOP
          },
          550,
          233
        )

        base.print(
          fontUND,
          550,
          1173,
          {
            text: 'A UNIDADE',
            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
            alignmentY: Jimp.VERTICAL_ALIGN_BOTTOM
          },
          550,
          233
        )
      }
    )

    base.write(path.join('src', 'assets', 'images', 'edited.png'))

    return c.json({
      message: 'The image has been created!'
    }, 201)
  }
}

export default new Create()
