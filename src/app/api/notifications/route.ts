import { NextResponse } from "next/server";
import { db } from "~/server/db";

import { visits, pets, pushSubscriptions } from "~/server/db/schema";
import { eq, and, sql} from "drizzle-orm";
import { sendPush } from "~/lib/push";
import { createPushPayload } from "~/lib/pushPayload";

export async function GET(req: Request): Promise<Response> {
  const authHeader = req.headers.get("authorization");

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
    const upcomingVisits = await db
    .select({
        visitId: visits.visitId,
        visitDate: visits.visitDate,
        petId: visits.petId,
        userId: pets.userId
    })
    .from(visits)
    .innerJoin(pets, eq(visits.petId, pets.petId))
    .where(
        and(
        eq(visits.visitDate, sql`CURRENT_DATE + INTERVAL '1 day'`),
        eq(visits.isNotified, false)
        )
    );

  for (const visit of upcomingVisits) {
    const subscriptions = await db
      .select()
      .from(pushSubscriptions)
      .where(eq(pushSubscriptions.userId, visit.userId));

    if (subscriptions.length === 0) {
      continue;
    }

    const payload = createPushPayload({
      title: "Visit reminder",
      body: "You have a visit scheduled tomorrow.",
      url: "/dashboard"
    });

    for (const sub of subscriptions) {
      await sendPush(sub, payload);
    }

    await db
      .update(visits)
      .set({ isNotified: true })
      .where(eq(visits.visitId, visit.visitId));
  }

  return NextResponse.json({ success: true });
}