import { Hono } from 'hono'

import UserController from '@/app/controller/user/create'
import UserMiddleware from '@/app/middleware/user/create'

const routes = new Hono()

routes.get('/', (c) => c.json({
  message: '😊 Everything is fine!'
}, 200))

routes.post('/user', UserMiddleware.Create, UserController.Create)

export default routes
