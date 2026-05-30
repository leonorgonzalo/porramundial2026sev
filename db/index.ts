import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

let activeDb: any = null;

// Inicializador para que Cloudflare le inyecte la base de datos en la petición
export function initDb(env: any) {
  if (!activeDb) {
    activeDb = drizzle(env.DB, { schema });
  }
}

// Tus archivos de /api seguirán importando esta 'db' exactamente como antes
export const db = new Proxy({}, {
  get(target, prop) {
    if (!activeDb) {
      throw new Error("La base de datos D1 no ha sido inicializada todavía.");
    }
    return Reflect.get(activeDb, prop);
  }
}) as ReturnType<typeof drizzle<typeof schema>>;
