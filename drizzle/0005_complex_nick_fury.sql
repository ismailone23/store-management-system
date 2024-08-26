CREATE TABLE IF NOT EXISTS "invoice_pricelist" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"invoice_id" uuid NOT NULL,
	"mrp" real DEFAULT 0 NOT NULL,
	"t_bill" real DEFAULT 0 NOT NULL,
	"ex_discount" real DEFAULT 0 NOT NULL,
	"tax" real DEFAULT 0 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_dealer_id_customers_dealer_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "invoice_pricelist" ADD CONSTRAINT "invoice_pricelist_invoice_id_invoices_id_fk" FOREIGN KEY ("invoice_id") REFERENCES "public"."invoices"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "invoices" ADD CONSTRAINT "invoices_dealer_id_customers_dealer_id_fk" FOREIGN KEY ("dealer_id") REFERENCES "public"."customers"("dealer_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
