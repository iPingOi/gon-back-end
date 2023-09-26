import { Hono } from 'hono'

import routes from './routes'

const app = new Hono()

const _PORT = 3000

app.route('/', routes)

export default {
  _PORT,
  fetch: app.fetch
}
