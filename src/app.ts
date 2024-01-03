import { serve } from '@hono/node-server'
import { Hono } from 'hono'

import routes from './routes'
import { cors } from 'hono/cors'

const app = new Hono()

app.route('/', routes)
app.use('*', cors({
  origin: 'https://gon-front-end.vercel.app',
  allowHeaders: ['Access-Control-Allow-Origin: https://gon-front-end.vercel.app', 'content-type: application/json']
}))

app.notFound((c) => {
  return c.json({
    message: 'Oops, page not found. Try again later!'
  }, 404)
})

app.onError((err, c) => {
  console.error('Error:', err.name, '\nMessage:', err.message)
  return c.json({
    message: 'Oops, something went wrong!'
  }, 500)
})

serve(app)
