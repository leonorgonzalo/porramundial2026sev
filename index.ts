// Importamos tus archivos de la API directamente
import { onRequest as apuestasHandler } from "./api/apuestas";
import { onRequest as participantesHandler } from "./api/participantes";
import { onRequest as metaHandler } from "./api/meta";

export default {
  async fetch(request: Request, env: any, ctx: any) {
    const url = new URL(request.url);

    // Si la web pide datos a la API, la interceptamos y ejecutamos su archivo real
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
      return new Response(JSON.stringify({ error: "Error ejecutando la API", detalles: String(apiError) }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Si no es una ruta de la API, sirve la página web estática normalmente
    if (env.ASSETS) {
      return await env.ASSETS.fetch(request);
    }

    return new Response("Servidor listo", { status: 200 });
  },
};
