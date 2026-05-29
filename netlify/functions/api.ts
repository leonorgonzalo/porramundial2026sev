import type { Config } from "@netlify/functions";
import { db } from "../../db/index.js";
import { participants, appResults, payments, appMeta } from "../../db/schema.js";
import { eq } from "drizzle-orm";

async function getAllData() {
  const [allParticipants, resultsRows, allPayments, metaRows] = await Promise.all([
    db.select().from(participants),
    db.select().from(appResults).where(eq(appResults.id, 1)),
    db.select().from(payments),
    db.select().from(appMeta).where(eq(appMeta.id, 1)),
  ]);

  const participantsObj: Record<string, unknown> = {};
  for (const p of allParticipants) {
    participantsObj[p.email] = {
      nombre: p.nombre,
      email: p.email,
      ...(p.data as Record<string, unknown>),
    };
  }

  const paymentsObj: Record<string, unknown> = {};
  for (const p of allPayments) {
    paymentsObj[p.email] = { pagado: true, fecha: p.fecha || "" };
  }

  return {
    participants: participantsObj,
    results: (resultsRows[0]?.data as Record<string, unknown>) || {},
    payments: paymentsObj,
    meta: metaRows[0]
      ? { cuota: metaRows[0].cuota, locked: metaRows[0].locked }
      : { cuota: 15, locked: false },
  };
}

export default async (req: Request) => {
  const url = new URL(req.url);
  const path = url.pathname;

  try {
    if (req.method === "GET" && path === "/api/data") {
      const data = await getAllData();
      return Response.json(data);
    }

    if (req.method === "POST" && path === "/api/participant") {
      const body = await req.json() as { email: string; nombre: string; data: Record<string, unknown> };
      const { email, nombre, data } = body;
      if (!email || !nombre) return new Response("Missing fields", { status: 400 });

      await db
        .insert(participants)
        .values({ email, nombre, data: data ?? {} })
        .onConflictDoUpdate({
          target: participants.email,
          set: { nombre, data: data ?? {}, updatedAt: new Date() },
        });

      return Response.json({ ok: true });
    }

    if (req.method === "DELETE" && path === "/api/participant") {
      const body = await req.json() as { email: string };
      const { email } = body;
      if (!email) return new Response("Missing email", { status: 400 });

      await Promise.all([
        db.delete(participants).where(eq(participants.email, email)),
        db.delete(payments).where(eq(payments.email, email)),
      ]);

      return Response.json({ ok: true });
    }

    if (req.method === "POST" && path === "/api/results") {
      const body = await req.json() as { data: Record<string, unknown> };

      await db
        .insert(appResults)
        .values({ id: 1, data: body.data ?? {} })
        .onConflictDoUpdate({
          target: appResults.id,
          set: { data: body.data ?? {}, updatedAt: new Date() },
        });

      return Response.json({ ok: true });
    }

    if (req.method === "POST" && path === "/api/payment") {
      const body = await req.json() as { email: string; paid: boolean; fecha?: string };
      const { email, paid, fecha } = body;
      if (!email) return new Response("Missing email", { status: 400 });

      if (paid) {
        await db
          .insert(payments)
          .values({ email, fecha: fecha ?? null })
          .onConflictDoUpdate({
            target: payments.email,
            set: { fecha: fecha ?? null },
          });
      } else {
        await db.delete(payments).where(eq(payments.email, email));
      }

      return Response.json({ ok: true });
    }

    if (req.method === "POST" && path === "/api/meta") {
      const body = await req.json() as { cuota: number };
      const cuota = parseInt(String(body.cuota)) || 15;

      await db
        .insert(appMeta)
        .values({ id: 1, cuota })
        .onConflictDoUpdate({
          target: appMeta.id,
          set: { cuota },
        });

      return Response.json({ ok: true });
    }

    if (req.method === "POST" && path === "/api/lock") {
      const body = await req.json() as { locked: boolean };
      const locked = !!body.locked;

      await db
        .insert(appMeta)
        .values({ id: 1, locked })
        .onConflictDoUpdate({
          target: appMeta.id,
          set: { locked },
        });

      return Response.json({ ok: true });
    }

    return new Response("Not found", { status: 404 });
  } catch (err) {
    console.error("API error:", err);
    return new Response("Internal server error", { status: 500 });
  }
};

export const config: Config = {
  path: "/api/*",
};
