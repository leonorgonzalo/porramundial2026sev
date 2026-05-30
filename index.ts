import { initDb } from "./db/index";

// Importamos manualmente tus endpoints de la carpeta api
import * as apuestas from "./api/apuestas";
import * as participantes from "./api/participantes";
import * as meta from "./api/meta";

export default {
  async fetch(request: Request, env: any, ctx: any) {
    // 1. Inyectamos la base de datos de Cloudflare pasándole el env
    initDb(env);

    const url = new URL(request.url);
    
    // 2. Enrutador manual y fijo (así Cloudflare no se queja al compilar)
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
