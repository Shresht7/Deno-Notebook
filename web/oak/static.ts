import { Application, send } from 'https://deno.land/x/oak/mod.ts'

const app = new Application()

app.use(async (ctx) => {
    await send(ctx, ctx.request.url.pathname, {
        root: `${Deno.cwd()}/oak/`,
        index: 'index.html'
    })
})

const port = 8000
console.log(`Server running on http://localhost:${port}`)
await app.listen({ port })