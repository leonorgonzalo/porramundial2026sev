import { initDb } from "./db/index.ts";

// Añadimos la extensión .ts para que el compilador de Cloudflare los localice del tirón
import * as apuestas from "./api/apuestas.ts";
import * as participantes from "./api/participantes.ts";
import * as meta from "./api/meta.ts";

export default {
  async fetch(request: Request, env: any, ctx: any) {
    // 1. Inyectamos la base de datos de Cloudflare pasándole el env
    initDb(env);

    const url = new URL(request.url);
    
    // 2. Enrutador manual
    if (url.pathname === "/api/apuestas") {
      return await (apuestas.default || (apuestas as any).handler)(request, env, ctx);
    }
    
    if (url.pathname === "/api/participantes") {
      return await (participantes.default || (participantes as any).handler)(request, env, ctx);
    }
    
    if (url.pathname === "/api/meta") {
      return await (meta.default || (meta as any).handler)(request, env, ctx);
    }

    // 3. Si no es ninguna ruta de la API, sirve los archivos visuales de la porra
    return env.ASSETS ? await env.ASSETS.fetch(request) : new Response("Not Found", { status: 404 });
  },
};
