//  Library
import { serve } from "https://deno.land/std@0.121.0/http/server.ts";
import { parse } from "https://deno.land/std@0.121.0/flags/mod.ts";
import { join } from "https://deno.land/std@0.121.0/path/mod.ts";

//  Parse arguments
const args = parse(Deno.args, {
  alias: {
    port: ["p"],
  },
  default: {
    port: 3737,
  },
});

const { port, _ } = args;

//  Get handlerPath from arguments
const handlerPath = args._?.[0] || join(Deno.cwd(), "index.ts");
const { handler } = await import(
  "file:\\" + await Deno.realPath(handlerPath.toString())
);
if (typeof handler !== "function") {
  throw Error("Please provider a handler function with a named export");
}

//  Start server and pass handler
serve(handler, { port });
console.log(`Server running on http://localhost:${port}`);
