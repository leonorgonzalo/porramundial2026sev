CREATE TABLE "app_meta" (
	"id" integer PRIMARY KEY DEFAULT 1,
	"cuota" integer DEFAULT 15 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "app_results" (
	"id" integer PRIMARY KEY DEFAULT 1,
	"data" jsonb NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "participants" (
	"email" text PRIMARY KEY,
	"nombre" text NOT NULL,
	"data" jsonb NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"email" text PRIMARY KEY,
	"fecha" text
);
