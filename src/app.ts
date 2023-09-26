import { Hono } from 'hono'

import HandleError from '@/utils/errorHandle'
import HandleNotFound from '@/utils/notFoundHandle'

import routes from './routes'

const app = new Hono()

const _PORT = 3000

app.route('/', routes)

HandleNotFound.Execute('Error')
HandleError.Execute()

export default {
  _PORT,
  fetch: app.fetch
}
