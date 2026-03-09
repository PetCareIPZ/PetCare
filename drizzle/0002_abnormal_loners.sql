CREATE TABLE "notification_settings" (
	"userId" varchar(255) PRIMARY KEY NOT NULL,
	"mailEnabled" boolean DEFAULT true NOT NULL,
	"pushEnabled" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "push_subscriptions" (
	"user_id" text NOT NULL,
	"endpoint" text NOT NULL,
	"p256dh" text NOT NULL,
	"auth" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "push_subscriptions_endpoint_unique" UNIQUE("endpoint")
);
--> statement-breakpoint
ALTER TABLE "visits" ADD COLUMN "isNotified" boolean DEFAULT false NOT NULL;