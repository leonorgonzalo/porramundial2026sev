import { initDb } from "./db/index.js";

// Usamos la extensión .js para que el compilador de Cloudflare los mapee correctamente
import * as apuestas from "./api/apuestas.js";
import * as participantes from "./api/participantes.js";
import * as meta from "./api/meta.js";

export default {
  async fetch(request: Request, env: any, ctx: any) {
    // 1. Inyectamos la base de datos de Cloudflare pasándole el env
    initDb(env);

    const url = new URL(request.url);
    
    // 2. Enrutador manual para tus endpoints
    if (url.pathname === "/api/apuestas") {
      return await (apuestas.default || (apuestas as any).handler)(request, env, ctx);
    }
    
    if (url.pathname === "/api/participantes") {
      return await (participantes.default || (participantes as any).handler)(request, env, ctx);
    }
    
    if (url.pathname === "/api/meta") {
      return await (meta.default || (meta as any).handler)(request, env, ctx);
    }

    // 3. Sirve los archivos visuales de la porra de la raíz si no es una petición de API
    return env.ASSETS ? await env.ASSETS.fetch(request) : new Response("Not Found", { status: 404 });
  },
};
