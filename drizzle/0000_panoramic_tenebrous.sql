DO $$
BEGIN
  CREATE TYPE "public"."premium_purchase_status" AS ENUM('active', 'revoked');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;
--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "has_premium_access";
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "dodo_customer_id" text;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dodo_webhook_event" (
  "event_type" text NOT NULL,
  "event_object_id" text NOT NULL,
  "payload_type" text NOT NULL,
  "occurred_at" timestamp with time zone NOT NULL,
  "payload" jsonb NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "premium_purchase" (
  "payment_id" text PRIMARY KEY NOT NULL,
  "user_id" text NOT NULL,
  "dodo_customer_id" text NOT NULL,
  "product_id" text NOT NULL,
  "status" "premium_purchase_status" DEFAULT 'active' NOT NULL,
  "granted_at" timestamp with time zone DEFAULT now() NOT NULL,
  "revoked_at" timestamp with time zone,
  "revoked_reason" text,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
  CONSTRAINT "premium_purchase_user_id_user_id_fk"
    FOREIGN KEY ("user_id")
    REFERENCES "public"."user"("id")
    ON DELETE cascade
    ON UPDATE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "dodo_webhook_event_dedupe_idx"
  ON "dodo_webhook_event" USING btree ("event_type", "event_object_id", "occurred_at");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "premium_purchase_user_id_idx"
  ON "premium_purchase" USING btree ("user_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "premium_purchase_product_id_idx"
  ON "premium_purchase" USING btree ("product_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "premium_purchase_status_idx"
  ON "premium_purchase" USING btree ("status");
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_dodo_customer_id_idx"
  ON "user" USING btree ("dodo_customer_id");
