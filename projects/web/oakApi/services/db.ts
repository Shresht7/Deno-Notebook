import { DB_PATH } from "../config.ts";
import type { User } from "../models/user.ts";

export const fetchData = async (): Promise<User[]> => {
  const data = await Deno.readTextFile(DB_PATH);
  return JSON.parse(data);
};

export const persistData = async (data: User[]) => {
  await Deno.writeTextFile(DB_PATH, JSON.stringify(data));
};
