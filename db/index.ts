import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

// Dejamos la variable preparada
export let db: any;

// Esta función configurará la conexión usando la URL de Supabase
export function initDb(env: any) {
  if (!db) {
    const sql = neon(env.DATABASE_URL || process.env.DATABASE_URL);
    db = drizzle(sql, { schema });
  }
}
