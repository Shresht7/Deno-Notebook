import { Context } from 'https://deno.land/x/oak/mod.ts'

function respond(ctx: Context, status: number, body: string) {
    ctx.response.status = status
    ctx.response.body = body
}

//  ------------------
export default respond
//  ------------------