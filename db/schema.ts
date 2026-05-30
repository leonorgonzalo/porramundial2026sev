import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

// Tabla de participantes
export const participants = sqliteTable("participants", {
  email: text("email").primaryKey(),
  nombre: text("nombre").notNull(),
  // En SQLite los JSON se guardan como texto básico
  data: text("data").notNull().$type<Record<string, unknown>>(), 
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
});

// Tabla de resultados de la porra
export const appResults = sqliteTable("app_results", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  data: text("data").notNull().$type<Record<string, unknown>>(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
});

// Tabla de pagos
export const payments = sqliteTable("payments", {
  email: text("email").primaryKey(),
  fecha: text("fecha"),
});

// Tabla de configuración / meta de la app
export const appMeta = sqliteTable("app_meta", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  cuota: integer("cuota").notNull().default(15),
  // SQLite no tiene tipo boolean real, usa un entero (0 o 1)
  locked: integer("locked", { mode: "boolean" }).notNull().default(false),
});