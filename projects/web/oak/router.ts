import { Application, Router } from 'https://deno.land/x/oak/mod.ts'

interface Book {
    id: number,
    title: string,
    author: string
}

const books = new Map<string, Book>()
books.set("1", {
    id: 1,
    title: "The Hound of the Baskervilles",
    author: "Conan Doyle, Arthur"
})

const router = new Router()
router
    .get("/", ctx => {
        ctx.response.body = 'Hello World!'
    })
    .get('/books', ctx => {
        ctx.response.body = Array.from(books.values())
    })
    .get('/books/:id', ctx => {
        if (books.has(ctx.params.id)) {
            ctx.response.body = books.get(ctx.params.id)
        } else {
            ctx.response.status = 404
            ctx.response.body = 'Not Found'
        }
    })

const app = new Application()

app.use(router.routes())
app.use(router.allowedMethods())

const port = 8000
console.log(`Server running on http://localhost:${port}`)
await app.listen({ port })