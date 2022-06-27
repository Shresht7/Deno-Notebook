//  Library
import { Application } from "https://deno.land/x/oak/mod.ts";

//  Middlewares
import router from "./router.ts";
import errorMiddleware from "./middlewares/errorHandler.ts";
import notFound from "./middlewares/notFound.ts";

//  Config
import { APP_HOST, APP_PORT } from "./config.ts";

//  -------------------------
const app = new Application();
//  -------------------------

app.use(errorMiddleware);
app.use(router.routes());
app.use(router.allowedMethods());
app.use(notFound);

console.log(`Server listening on http://localhost:${APP_PORT}`);

//-----------------------------------------
await app.listen(`${APP_HOST}:${APP_PORT}`);
//-----------------------------------------
