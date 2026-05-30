export default {
  async fetch(request: Request, env: any, ctx: any) {
    // Servimos directamente los archivos visuales y las rutas internas de la porra
    if (env.ASSETS) {
      return await env.ASSETS.fetch(request);
    }

    return new Response("¡Porra Mundial 2026 activa con Postgres!", { status: 200 });
  },
};
