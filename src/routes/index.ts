import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from '@hono/node-server/serve-static'

import Controller from '@/app/controllers'
import Middleware from '@/app/middlewares'

const routes = new Hono()
routes.use('/public/*', serveStatic({ root: './' }))

// _GET
routes.get('/', (c) => c.json({
  message: '😊 Everything is fine!'
}, 200))

routes.get('/product/:id', Controller.ViewProduct.View)

// _POST
routes.post('/user', cors({
  origin: 'https://gon-front-end.vercel.app',
  allowHeaders: ['content-type: application/json', 'accept: application/json']
}), Middleware.CreateUser.Create, Controller.CreateUser.Execute)
routes.post('/create', cors({
  origin: 'https://gon-front-end.vercel.app',
  allowHeaders: ['content-type: application/json', 'accept: application/json']
}), Controller.CreateJimp.Jimp)
routes.post('/product', cors({
  origin: 'https://gon-front-end.vercel.app',
  allowHeaders: ['content-type: application/json', 'accept: application/json']
}), Controller.CreateProduct.Execute)

export default routes
