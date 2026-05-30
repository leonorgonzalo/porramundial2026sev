import { initDb } from "./db/index"; // Asegúrate de que esta ruta apunte bien a tu carpeta db

export default {
  async fetch(request: Request, env: any) {
    // Inyectamos la base de datos de Cloudflare antes de procesar nada
    initDb(env);

    // Aquí es donde tu sistema procesaría las rutas normales de /api.
    // De momento, para que Cloudflare valide el script con éxito y se ponga en VERDE,
    // le devolvemos una respuesta directa de control:
    return new Response("¡Porra Mundial 2026 Online en Cloudflare!");
  },
};
