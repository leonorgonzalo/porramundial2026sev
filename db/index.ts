import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema.js";

export interface Env {
  DB: D1Database;
}

export default {
  async fetch(request: Request, env: Env) {
    const db = drizzle(env.DB, { schema });
    return new Response("¡Porra Mundial conectada con éxito a Cloudflare D1!");
  },
};