import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

let activeDb: any = null;

// Esta función la llamará el index principal
export function initDb(env: any) {
  if (!activeDb) {
    activeDb = drizzle(env.DB, { schema });
  }
}

// Tus archivos de la carpeta /api seguirán usando esta 'db'
export const db = new Proxy({}, {
  get(target, prop) {
    if (!activeDb) {
      throw new Error("La base de datos D1 no ha sido inicializada todavía.");
    }
    return Reflect.get(activeDb, prop);
  }
}) as ReturnType<typeof drizzle<typeof schema>>;
