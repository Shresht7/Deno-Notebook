import { Context } from 'https://deno.land/x/abc/mod.ts'
import type { Book } from '../models/books.ts'

let books: Book[] = [
    { id: '1', title: 'Book 1', author: 'author1', numberOfPages: 40 },
    { id: '2', title: 'Book 2', author: 'author2', numberOfPages: 60 },
    { id: '3', title: 'Book 3', author: 'author1', numberOfPages: 50 },
    { id: '4', title: 'Book 4', author: 'author3', numberOfPages: 10 },
]

export const getAllBooks = (ctx: Context) => {
    return ctx.json(books, 200)
}

export const getBook = (ctx: Context) => {
    const { id } = ctx.params
    const book = books.find(b => b.id === id)
    if (book) {
        return ctx.json(book, 200)
    } else {
        return ctx.string('No book', 404)
    }
}

export const createBook = async (ctx: Context) => {
    const id = crypto.randomUUID()
    const { title, author, numberOfPages } = await ctx.body as Book
    const book = { id, title, author, numberOfPages }
    books.push(book)
    return ctx.json(book, 201)
}

export const deleteBook = (ctx: Context) => {
    const { id } = ctx.params
    const book = books.find(b => b.id === id)

    if (book) {
        books = books.filter(b => b.id !== id)
        return ctx.json(books, 200)
    } else {
        return ctx.string('failed to delete', 400)
    }
}