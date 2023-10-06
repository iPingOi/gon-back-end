import { Hono } from 'hono'

import Controller from '@/app/controllers'
import Middleware from '@/app/middlewares'

const routes = new Hono()

routes.get('/', (c) => c.json({
  message: '😊 Everything is fine!'
}, 200))

routes.post('/user', Middleware.CreateUser.Create, Controller.CreateUser.Execute)
routes.post('/can', Controller.CreateJimp.Jimp)

export default routes
