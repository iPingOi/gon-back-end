import { Hono } from 'hono'

import Create from '@/app/controller/userController/create'

const routes = new Hono()

routes.get('/', (c) => c.json({
  message: '😊 Everything is fine!'
}, 200))

routes.post('/user', Create.Execute)

export default routes
