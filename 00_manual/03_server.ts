import { serve } from "https://deno.land/x/std@0.121.0/http/server.ts";

//  Http Request handler function
async function handler(req: Request): Promise<Response> {
  console.log("Method:", req.method);

  const url = new URL(req.url);
  console.log("Path:", url.pathname);
  console.log("Query Parameters:", url.searchParams);

  console.log("Headers:", req.headers);

  if (req.body) {
    const body = await req.text();
    console.log("Body:", body);
  }

  //  Returns a Http Response
  return new Response("Hello World!");
}

//  Start server on port 3737 and pass handler
serve(handler, { port: 3737 });
console.log("Server running on http://localhost:3737");

//  To serve https use serveTls instead. This will take two extra arguments: certFile and keyFile.
