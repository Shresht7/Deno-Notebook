import { Application } from 'https://deno.land/x/abc/mod.ts'

import { createBook, deleteBook, getAllBooks, getBook } from './controllers/books.ts'

const app = new Application()

app.static('/', 'public')

app.get('/', async (ctx) => {
    await ctx.file('public/index.html')
})

app
    .get('/books', (ctx) => getAllBooks(ctx))
    .get('/books/:id', (ctx) => getBook(ctx))
    .post('/books/', (ctx) => createBook(ctx))
    .delete('/books/:id', (ctx) => deleteBook(ctx))

const port = 8000
console.log(`Server running on http://localhost:${port}`)
app.start({ port })