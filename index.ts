import { initDb } from "./db/index";

// Volvemos al formato sin extensiones para que TypeScript no proteste
import * as apuestasEndpoint from "./api/apuestas";
import * as participantesEndpoint from "./api/participantes";
import * as metaEndpoint from "./api/meta";

export default {
  async fetch(request: Request, env: any, ctx: any) {
    // 1. Inyectamos la base de datos pasándole el env
    initDb(env);

    const url = new URL(request.url);
    
    // 2. Enrutador manual sin interferencias de nombres
    if (url.pathname === "/api/apuestas") {
      return await (apuestasEndpoint.default || (apuestasEndpoint as any).handler)(request, env, ctx);
    }
    
    if (url.pathname === "/api/participantes") {
      return await (participantesEndpoint.default || (participantesEndpoint as any).handler)(request, env, ctx);
    }
    
    if (url.pathname === "/api/meta") {
      return await (metaEndpoint.default || (metaEndpoint as any).handler)(request, env, ctx);
    }

    // 3. Sirve la interfaz visual de la porra si no es una petición de API
    return env.ASSETS ? await env.ASSETS.fetch(request) : new Response("Not Found", { status: 404 });
  },
};
