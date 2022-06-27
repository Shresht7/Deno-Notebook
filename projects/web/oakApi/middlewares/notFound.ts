import { Context } from "https://deno.land/x/oak/mod.ts";

export default (ctx: Context) => {
  ctx.response.status = 404;
  ctx.response.body = { msg: "Not Found" };
};
