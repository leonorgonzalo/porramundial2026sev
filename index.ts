import { initDb } from "./db/index";

export default {
  async fetch(request: Request, env: any) {
    // Inicializamos la base de datos pasándole el entorno de Cloudflare
    initDb(env);

    // Respuesta rápida para que Cloudflare dé el despliegue por BUENO
    return new Response("¡Porra Mundial 2026 Online en Cloudflare D1!");
  },
};
