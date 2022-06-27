//  Library
import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import * as services from "../services/user.ts";
import respond from "../helpers/respond.ts";
import type { User } from "../models/user.ts";

//  GET USERS
//  ---------

export const getUsers = async (ctx: RouterContext<"/users">) => {
  ctx.response.body = await services.getUsers();
};

//  GET USER
//  --------

export const getUser = async (
  ctx: RouterContext<"/users/:id", { id: string }>,
) => {
  const id = ctx.params.id;
  if (!id) {
    respond(ctx, 400, "Invalid user");
    return;
  }
  const user = await services.getUser(id);
  if (!user) {
    respond(ctx, 404, "User not found");
    return;
  }
  ctx.response.body = user;
};

//  CREATE USER
//  -----------

export const createUser = async (ctx: RouterContext<"/users">) => {
  if (!ctx.request.hasBody) {
    respond(ctx, 400, "Invalid data");
    return;
  }

  const { name, isAdmin } = await ctx.request.body() as unknown as User;

  if (!name) {
    respond(ctx, 422, "Incorrect user data");
    return;
  }

  const id = await services.createUser({ name, isAdmin });

  ctx.response.body = { msg: "user created", id };
};

//  UPDATE USER
//  -----------

export const updateUser = async (
  ctx: RouterContext<"/users/:id", { id: string }>,
) => {
  const id = ctx.params.id;

  if (!id) {
    respond(ctx, 400, "Invalid user-id");
    return;
  }

  if (!ctx.request.hasBody) {
    respond(ctx, 400, "Invalid user data");
    return;
  }

  const { name, isAdmin } = await ctx.request.body() as unknown as User;

  await services.updateUser(id, { name, isAdmin });

  ctx.response.body = { msg: "User updated" };
};

//  DELETE USER
//  -----------

export const deleteUser = async (
  ctx: RouterContext<"/users/:id", { id: string }>,
) => {
  const id = ctx.params.id;

  if (!id) {
    respond(ctx, 400, "Invalid Id");
    return;
  }

  const user = await services.getUser(id);

  if (!user) {
    respond(ctx, 404, "User not found");
    return;
  }

  await services.deleteUser(id);

  ctx.response.body = { msg: "User Deleted" };
};
