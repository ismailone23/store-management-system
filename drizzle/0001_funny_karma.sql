DO $$ BEGIN
 CREATE TYPE "public"."payment_type" AS ENUM('CASH', 'ONLINE', 'PENDING');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "customers" (
	"dealer_id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"number" varchar NOT NULL,
	"t_debit" real DEFAULT 0 NOT NULL,
	"t_credit" real DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "customers_dealer_id_unique" UNIQUE("dealer_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "invoices" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"dealer_id" serial NOT NULL,
	"purchased_list" varchar NOT NULL,
	"payment_method" "payment_type" DEFAULT 'PENDING' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "invoices" ADD CONSTRAINT "invoices_dealer_id_customers_dealer_id_fk" FOREIGN KEY ("dealer_id") REFERENCES "public"."customers"("dealer_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
