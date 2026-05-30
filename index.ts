import { initDb } from "./db/index";

export default {
  async fetch(request: Request, env: any, ctx: any) {
    // 1. Conectamos el cable real a tu porra-db de Cloudflare
    initDb(env);

    // 2. Comprobamos si la petición va dirigida a tus archivos de la carpeta /api
    const url = new URL(request.url);
    
    if (url.pathname.startsWith("/api/")) {
      // Extraemos el nombre del archivo que se quiere ejecutar (ej: "apuestas", "participantes")
      const endpoint = url.pathname.replace("/api/", "");
      
      try {
        // Importamos dinámicamente tu archivo de la carpeta api correspondiente
        const apiModule = await import(`./api/${endpoint}`);
        
        // Si tu archivo de la api exporta una función por defecto (handler), la ejecutamos pasándole la petición
        if (apiModule.default && typeof apiModule.default === "function") {
          return await apiModule.default(request, env, ctx);
        } else if (apiModule.handler && typeof apiModule.handler === "function") {
          return await apiModule.handler(request, env, ctx);
        }
      } catch (error) {
        return new Response(`Error ejecutando la API /api/${endpoint}`, { status: 500 });
      }
    }

    // 3. Si no es una petición de API, Cloudflare Pages/Workers servirá automáticamente 
    // tus archivos visuales (HTML, JS, CSS) desde la raíz gracias a la configuración de "assets".
    // Para que no se quede la pantalla fija con el texto de prueba, dejamos que continúe el flujo:
    return env.ASSETS ? await env.ASSETS.fetch(request) : new Response("Not Found", { status: 404 });
  },
};
