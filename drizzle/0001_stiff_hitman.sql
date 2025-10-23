ALTER TABLE "coffees" ADD COLUMN "roast_level" varchar(20);--> statement-breakpoint
ALTER TABLE "coffees" ADD COLUMN "rating" integer;--> statement-breakpoint
ALTER TABLE "coffees" ADD COLUMN "created_at" timestamp with time zone DEFAULT now();