import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite", 
  // Quítale también aquí el ".js" del final para que quede así:
  schema: "./schema", 
  out: "./drizzle",
});