import { initDb } from "./db/index";

export default {
  async fetch(request: Request, env: any) {
    // Inicializamos la base de datos centralizada D1
    initDb(env);

    // Respuesta limpia de control
    return new Response("¡Porra Mundial 2026 conectada con éxito a Cloudflare D1!");
  },
};
