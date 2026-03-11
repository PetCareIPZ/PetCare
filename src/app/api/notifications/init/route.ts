import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { notificationSettings } from "~/server/db/schema";

export async function POST(): Promise<Response> {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await db.insert(notificationSettings)
    .values({ userId })
    .onConflictDoNothing();

  return NextResponse.json({ success: true });
}