import { Application } from 'https://deno.land/x/oak/mod.ts'

const app = new Application()

//  Logger
app.use(async (ctx, next) => {
    await next()
    const responseTime = ctx.response.headers.get('X-Response-Time')
    console.log(`${ctx.request.method} ${ctx.request.url} - ${responseTime}`)
})

//  Timing
app.use(async (ctx, next) => {
    const start = Date.now()
    await next()
    const time = Date.now() - start
    ctx.response.headers.set('X-Response-Time', `${time}ms`)
})

//  Hello World
app.use(ctx => {
    ctx.response.body = 'Hello World'
})

const port = 8000
console.log(`Server listening on http://localhost:${port}`)
await app.listen({ port })