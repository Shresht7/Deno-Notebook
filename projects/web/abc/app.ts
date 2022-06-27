import { Application } from "https://deno.land/x/abc/mod.ts";

const app = new Application();

app.static("/", "public");

app.get("/", async (ctx) => {
  await ctx.file("public/index.html");
});

const port = 8000;
console.log(`Server running on http://localhost:${port}`);
app.start({ port });
