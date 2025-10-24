ALTER TABLE "tests" RENAME COLUMN "grind_size" TO "grind_fineness";--> statement-breakpoint
ALTER TABLE "tests" RENAME COLUMN "quantity" TO "water_quantity";--> statement-breakpoint
ALTER TABLE "tests" ADD COLUMN "filter_type" varchar(40);--> statement-breakpoint
ALTER TABLE "tests" ADD COLUMN "dose_grams" integer;--> statement-breakpoint
ALTER TABLE "tests" ADD COLUMN "preinfusion_sec" integer;--> statement-breakpoint
ALTER TABLE "tests" ADD COLUMN "extraction_sec" integer;