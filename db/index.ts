import { drizzle } from "drizzle-orm/d1";
// Cambia esto quitando el ".js" del final:
import * as schema from "./schema"; 

export interface Env {
  DB: D1Database;
}

export default {
  async fetch(request: Request, env: Env) {
    const db = drizzle(env.DB, { schema });
    return new Response("¡Porra Mundial conectada con éxito a Cloudflare D1!");
  },
};