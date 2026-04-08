import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { visits, pets, pushSubscriptions, notificationSettings } from "~/server/db/schema";
import { eq, and, sql,lt, gte } from "drizzle-orm";
import { sendPush } from "~/lib/push";
import { createPushPayload } from "~/lib/pushPayload";
import { clerkClient } from "@clerk/nextjs/server";
import { sendMail } from "~/lib/sendmail";

export async function GET(req: Request): Promise<Response> {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const upcomingVisits = await db
    .select({
      visitId: visits.visitId,
      visitDate: visits.visitDate,
      petId: visits.petId,
      petName: pets.petName,
      userId: pets.userId
    })
    .from(visits)
    .innerJoin(pets, eq(visits.petId, pets.petId))
    .where(
      and(
        gte(visits.visitDate, sql`CURRENT_DATE + INTERVAL '1 day'`),
        lt(visits.visitDate, sql`CURRENT_DATE + INTERVAL '2 day'`),
        eq(visits.isNotified, false)
      )
    );

  for (const visit of upcomingVisits) {
    console.log("znaleziono wizyte: ", visit)
    const subscriptionsSettings = await db
    .select().from(notificationSettings)
    .where(
      and(
        eq(notificationSettings.userId, visit.userId),
      )
    );
    if (subscriptionsSettings.length === 0 || !subscriptionsSettings[0] || subscriptionsSettings[0].pushEnabled === false || subscriptionsSettings[0].mailEnabled === false) {
        continue;
    }
    let hasSentNotification = false;
    if(subscriptionsSettings[0].pushEnabled === true){
        const subscriptions = await db
        .select()
        .from(pushSubscriptions)
        .where(eq(pushSubscriptions.userId, visit.userId));
    
        if (subscriptions.length === 0) {
            continue;
        }
    
        const payload = createPushPayload({
            title: "Przypomnienie o wizycie",
            body: `${visit.petName} ma wizytę jutro. Kliknij, aby zobaczyć szczegóły.`,
            url: "/dashboard/visits"
        });

        for (const sub of subscriptions) {
            await sendPush(sub, payload);
        }
        hasSentNotification = true;
    }

    if(subscriptionsSettings[0].mailEnabled === true){
        const client = await clerkClient();
        if(!client){
            continue;
        }
        const user = await client.users.getUser(visit.userId);

        if(!user){
            continue;
        }
        if(!user.emailAddresses[0]){
            continue;
        }
        const email = user.emailAddresses[0].emailAddress;
        if(!email){
            continue;
        }
        
        await sendMail(
            email,
            "Przypomnienie o wizycie",
            `<p>${visit.petName} ma zaplanowaną wizytę na jutro.</p>`
        );
        hasSentNotification = true;
    }
    if(hasSentNotification){
        await db
            .update(visits)
            .set({ isNotified: true })
            .where(eq(visits.visitId, visit.visitId));
    }
  }

  return NextResponse.json({ success: true });
}