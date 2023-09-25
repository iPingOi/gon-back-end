import { Hono } from 'hono'

const routes = new Hono()

routes.get('/', (c) => c.json({
  message: '😊 Everything is fine!'
}, 200))

export default routes