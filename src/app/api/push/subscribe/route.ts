import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { pushSubscriptions } from "~/server/db/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<Response> {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await req.json();

  const { endpoint, keys } = payload.subscription;
  const {type, model, vendor, os, engine} = payload.userDevData;

  await db.insert(pushSubscriptions)
    .values({
      userId,
      endpoint,
      p256dh: keys.p256dh,
      auth: keys.auth,
      type: type ?? "",
      model: model ?? "",
      vendor: vendor ?? "",
      os: os ?? "",
      engine: engine ?? "", 
    })
    .onConflictDoUpdate({
      target: pushSubscriptions.endpoint,
      set: {
        userId
      }
    });

  return NextResponse.json({ success: true });
}