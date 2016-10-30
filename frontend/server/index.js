import Koa from 'koa'
import convert from 'koa-convert'
import logger from 'koa-logger'
import serve from 'koa-static'
import mount from 'koa-mount'

import reactApp from './reactApp'

const app = new Koa()

app.use(logger())
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.body = { message: err.message }
    ctx.status = err.status || 500
  }
})

app.use(mount('/public', serve('public')))

app.use(reactApp)

app.listen(3000)
