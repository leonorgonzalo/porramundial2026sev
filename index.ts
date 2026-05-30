import { initDb } from "./db/index";

// Cargamos tus endpoints de la carpeta api
import { onRequest as apuestasHandler } from "./api/apuestas";
import { onRequest as participantesHandler } from "./api/participantes";
import { onRequest as metaHandler } from "./api/meta";

export default {
  async fetch(request: Request, env: any, ctx: any) {
    // 1. Inicializamos la conexión a Supabase con las variables del entorno
    initDb(env);

    const url = new URL(request.url);
    
    // 2. Enrutador manual para procesar las peticiones en la base de datos real
    try {
      if (url.pathname === "/api/apuestas") {
        return await (apuestasHandler as any)(request, env, ctx);
      }
      
      if (url.pathname === "/api/participantes") {
        return await (participantesHandler as any)(request, env, ctx);
      }
      
      if (url.pathname === "/api/meta") {
        return await (metaHandler as any)(request, env, ctx);
      }
    } catch (apiError) {
      return new Response(JSON.stringify({ error: "Error en la ejecución de la API", detalles: String(apiError) }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    // 3. Sirve la interfaz visual de la porra si no es una ruta de la API
    return env.ASSETS ? await env.ASSETS.fetch(request) : new Response("Not Found", { status: 404 });
  },
};
