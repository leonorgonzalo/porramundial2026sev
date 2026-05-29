import { pgTable, text, jsonb, timestamp, integer, boolean } from "drizzle-orm/pg-core";

export const participants = pgTable("participants", {
  email: text("email").primaryKey(),
  nombre: text("nombre").notNull(),
  data: jsonb("data").notNull().$type<Record<string, unknown>>(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const appResults = pgTable("app_results", {
  id: integer("id").primaryKey().default(1),
  data: jsonb("data").notNull().$type<Record<string, unknown>>(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const payments = pgTable("payments", {
  email: text("email").primaryKey(),
  fecha: text("fecha"),
});

export const appMeta = pgTable("app_meta", {
  id: integer("id").primaryKey().default(1),
  cuota: integer("cuota").notNull().default(15),
  locked: boolean("locked").notNull().default(false),
});
