import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

// Conectamos a Supabase usando el puente HTTP compatible sin instalar paquetes extra
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });
