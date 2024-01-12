import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

import Controller from '@/app/controllers'
const routes = new Hono()

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
routes.post('/create', Controller.CreateJimp.Jimp)
routes.post('/product', Controller.CreateProduct.Execute)

export default routes
