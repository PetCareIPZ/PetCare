ALTER TABLE "visits" ALTER COLUMN "visitDate" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "push_subscriptions" ADD COLUMN "type" text NOT NULL;--> statement-breakpoint
ALTER TABLE "push_subscriptions" ADD COLUMN "model" text NOT NULL;--> statement-breakpoint
ALTER TABLE "push_subscriptions" ADD COLUMN "vendor" text NOT NULL;--> statement-breakpoint
ALTER TABLE "push_subscriptions" ADD COLUMN "os" text NOT NULL;--> statement-breakpoint
ALTER TABLE "push_subscriptions" ADD COLUMN "engine" text NOT NULL;