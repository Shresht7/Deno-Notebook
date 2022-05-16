import * as path from 'https://deno.land/std@0.121.0/path/mod.ts'
import { readableStreamFromReader } from 'https://deno.land/std@0.121.0/streams/mod.ts'

//  Start listening on port 8080 of local host
const port = 8080
const server = Deno.listen({ port })
console.log(`Server running on http://localhost:${port}`)

for await (const connection of server) {
    handleHttp(connection)
}

async function handleHttp(conn: Deno.Conn) {
    const httpConnection = Deno.serveHttp(conn)
    for await (const requestEvent of httpConnection) {
        handleRequest(requestEvent)
    }
}

async function handleRequest(requestEvent: Deno.RequestEvent) {
    //  Use request pathname as filePath
    const url = new URL(requestEvent.request.url)
    const filePath = decodeURIComponent(url.pathname)

    //  Try opening the file
    let file
    try {
        file = await Deno.open('.' + filePath, { read: true })
        const stat = await file.stat()

        //  If file instance is a directory, lookup index.html
        if (stat.isDirectory) {
            file.close()
            const newFilePath = path.join('./', filePath, "index.html")
            file = await Deno.open(newFilePath, { read: true })
        }
    } catch (_err) {
        //  If the file cannot be opened then return 404
        const notFoundResponse = new Response('404 not found', { status: 404 })
        return await requestEvent.respondWith(notFoundResponse)
    }

    //  Build a readable stream so the file doesn't have to be fully loaded into memory while we send it
    const readableStream = readableStreamFromReader(file)

    //  Build and send the response
    const response = new Response(readableStream)
    return await requestEvent.respondWith(response)
}