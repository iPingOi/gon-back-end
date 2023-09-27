import { Hono } from 'hono'

import routes from './routes'

const app = new Hono()

app.route('/', routes)

app.notFound((c) => {
  return c.json({
    message: 'Oops, page not found. Try again later!'
  }, 404)
})

app.onError((err, c) => {
  console.error('Message:', err.message)
  return c.json({
    message: 'Oops, something went wrong!'
  }, 500)
})

export default {
  port: process.env._PORT,
  fetch: app.fetch
}
