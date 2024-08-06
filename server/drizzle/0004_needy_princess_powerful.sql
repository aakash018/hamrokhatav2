CREATE TABLE IF NOT EXISTS "personalPayments" (
	"id" serial PRIMARY KEY NOT NULL,
	"from" integer NOT NULL,
	"to" integer NOT NULL,
	"amount" double precision DEFAULT 0 NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "personalPayments" ADD CONSTRAINT "personalPayments_from_members_id_fk" FOREIGN KEY ("from") REFERENCES "public"."members"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "personalPayments" ADD CONSTRAINT "personalPayments_to_members_id_fk" FOREIGN KEY ("to") REFERENCES "public"."members"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
