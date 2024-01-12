import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

import Controller from '@/app/controllers'
import Middleware from '@/app/middlewares'

const origins = ['https://gon-front-end.vercel.app', 'http://localhost:3000']

const routes = new Hono()
routes.use(cors())

routes.use('/public/*', serveStatic({ root: './' }))

// _GET
routes.get('/', (c) =>
	c.json(
		{
			message: '😊 Everything is fine!',
		},
		200,
	),
)

routes.get('/product/:id', Controller.ViewProduct.View)

// _POST
routes.post('/user', Middleware.CreateUser.Create)
routes.post('/create', Controller.CreateJimp.Jimp)
routes.post('/product', Controller.CreateProduct.Execute)

export default routes
