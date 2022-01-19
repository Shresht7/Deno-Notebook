//  Library
import { serve } from 'https://deno.land/std@0.121.0/http/server.ts'
import { parse } from 'https://deno.land/std@0.121.0/flags/mod.ts'

//  Parse arguments
const args = parse(Deno.args, {
    alias: {
        port: ['p']
    },
    default: {
        port: 3737
    }
})

const { port, _: rest } = args

//  Get handlerPath from arguments
const handlerPath = await Deno.realPath(rest[0].toString())
const { handler } = await import('file:\\' + handlerPath)
if (typeof handler !== 'function') {
    throw Error('Please provider a handler function with a named export')
}

//  Start server and pass handler
serve(handler, { port })
console.log(`Server running on http://localhost:${port}`)