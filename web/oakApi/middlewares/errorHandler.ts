import { Context } from 'https://deno.land/x/oak/mod.ts'

export default async (ctx: Context, next: () => Promise<unknown>) => {
    try {
        await next()
    } catch (err) {
        ctx.response.status = 500
        ctx.response.body = { msg: err.message }
    }
}