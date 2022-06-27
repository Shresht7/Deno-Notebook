export const handler = (request: Request): Response => {
    const { pathname } = new URL(request.url)
    if (pathname !== '/') { return new Response('Not Found', { status: 404 }) }
    return new Response(request.method + " --- " + request.url)
}