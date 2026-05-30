import { initDb } from "./db/index";

export default {
  async fetch(request: Request, env: any, ctx: any) {
    // Inicializamos la conexión global a tu Postgres de Supabase
    initDb(env);

    // Si la petición viene de la web, dejamos que el motor de Cloudflare Assets
    // sirva la interfaz y gestione las llamadas internas usando la DB ya inicializada
    if (env.ASSETS) {
      return await env.ASSETS.fetch(request);
    }

    return new Response("¡Porra Mundial 2026 activa con Postgres!", { status: 200 });
  },
};
