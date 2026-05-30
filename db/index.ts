import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

let activeDb: any = null;

export function initDb(env: any) {
  if (!activeDb) {
    // Lee la URL de Supabase que configuramos en el wrangler.jsonc
    const sql = neon(env.DATABASE_URL);
    activeDb = drizzle(sql, { schema });
  }
}

// Tus archivos internos usarán esta constante que apunta directo a Supabase en tiempo real
export const db = new Proxy({}, {
  get(target, prop) {
    if (!activeDb) {
      throw new Error("La base de datos de Supabase no ha sido inicializada.");
    }
    return Reflect.get(activeDb, prop);
  }
}) as ReturnType<typeof drizzle<typeof schema>>;
