import { type Context } from 'hono'
import Jimp from 'jimp'
import path from 'path'

class Create {
  async Jimp (c: Context): Promise<Response> {
    const image = await Jimp.read(path.join('src', 'images', 'base.png'))

    const { text } = await c.req.json()

    image.print(
      await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE),
      630,
      880,
      {
        text,
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
      },
      450,
      157,
      () => {
        image.write(path.join('src', 'images', 'edited.png'))
      }
    )

    // image.write(path.join('src', 'images', 'edited.png'))

    return c.json({
      message: 'ok'
    })
  }
}

export default new Create()
