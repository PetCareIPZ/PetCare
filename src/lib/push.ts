import webpush from "web-push";
import { db } from "~/server/db";
import { pushSubscriptions } from "~/server/db/schema";
import { eq } from "drizzle-orm";

webpush.setVapidDetails(
  "mailto:admin@example.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function sendPush(
  subscription: typeof pushSubscriptions.$inferSelect,
  payload: string
): Promise<void> {
  try {
    await webpush.sendNotification(
      {
        endpoint: subscription.endpoint,
        keys: {
          p256dh: subscription.p256dh,
          auth: subscription.auth
        }
      },
      payload
    );
  } catch (error: any) {
    if (error.statusCode === 404 || error.statusCode === 410) {
      await db.delete(pushSubscriptions)
        .where(eq(pushSubscriptions.endpoint, subscription.endpoint));
    }
  }
}