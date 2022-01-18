//  Library
import { serve } from 'https://deno.land/std@0.121.0/http/server.ts'

if (!Deno.args?.length) {
    throw Error('Please provide the path to the handler function')
}

//  Get handlerPath from arguments
const [handlerPath] = Deno.args
const { handler } = await import(await Deno.realPath(handlerPath))
if (typeof handler !== 'function') {
    throw Error('Please provider a handler function with a named export')
}

//  Start server on port 3737 and pass handler
serve(handler, { port: 3737 })
console.log('Server running on http://localhost:3737')