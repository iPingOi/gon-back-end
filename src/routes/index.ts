import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from '@hono/node-server/serve-static'

import Controller from '@/app/controllers'
import Middleware from '@/app/middlewares'

const routes = new Hono()
routes.use('/public/*', serveStatic({ root: './' }))

routes.use('*', cors({
  origin: 'gon-front-end.vercel.app',
  allowHeaders: ['Access-Control-Allow-Origin: gon-front-end.vercel.app', 'content-type: application/json']
}))

// _GET
routes.get('/', (c) => c.json({
  message: '😊 Everything is fine!'
}, 200))

routes.get('/product/:id', Controller.ViewProduct.View)

// _POST
routes.post('/user', Middleware.CreateUser.Create, Controller.CreateUser.Execute)
routes.post('/create', Controller.CreateJimp.Jimp)
routes.post('/product', Controller.CreateProduct.Execute)
routes.post('/auth', Controller.UserAuth.Execute)

export default routes
