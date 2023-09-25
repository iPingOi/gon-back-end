import { Hono } from 'hono'

const app = new Hono()

const _PORT = 3000

app.get('/', (c) => c.json({
  message: '😊 Everything is fine!'
}, 200))

app.notFound((c) => {
  return c.json({
    message: 'Oops, page not found. Try again later!'
  }, 404)
})

app.onError((err, c) => {
  console.error(`${err}`)
  return c.json({
    message: 'Oops, something went wrong. Try again later!'
  }, 500)
})

export default {
  _PORT,
  fetch: app.fetch
}
