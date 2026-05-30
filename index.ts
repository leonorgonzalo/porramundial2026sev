export default {
  async fetch(request: Request, env: any, ctx: any) {
    // Dejamos que el motor de Cloudflare Assets sirva la porra por completo.
    // El framework se encargará de gestionar internamente las rutas /api/apuestas, etc.
    if (env.ASSETS) {
      return await env.ASSETS.fetch(request);
    }

    return new Response("Servidor de la Porra Activo", { status: 200 });
  },
};
