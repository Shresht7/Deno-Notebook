import { Router } from "https://deno.land/x/oak/mod.ts";

import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "./controllers/user.ts";

const router = new Router();

router
  .get("/users", getUsers)
  .get("/users/:id", getUser)
  .post("/users", createUser)
  .put("/users/:id", updateUser)
  .delete("/users/:id", deleteUser);

//  -----------------
export default router;
//  -----------------
