import { Hono } from 'hono'

import Controller from '@/app/controllers'
import Middleware from '@/app/middlewares'

const routes = new Hono()

// _GET
routes.get('/', (c) => c.json({
  message: '😊 Everything is fine!'
}, 200))

routes.get('/product/:id', Controller.ViewProduct.View)

// _POST
routes.post('/user', Middleware.CreateUser.Create, Controller.CreateUser.Execute)
routes.post('/create', Controller.CreateJimp.Jimp)

export default routes
