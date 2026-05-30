import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

// Al leer directamente process.env, la base de datos está disponible al 100% desde el inicio
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("La variable de entorno DATABASE_URL no está configurada.");
}

const sql = neon(databaseUrl);
export const db = drizzle(sql, { schema });
