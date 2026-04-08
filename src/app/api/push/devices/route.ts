import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { pushSubscriptions } from "~/server/db/schema";
import { eq } from 'drizzle-orm';

export async function GET(): Promise<Response> {
  const { userId } = await auth();

    if (!userId) {  
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  
    const devices = await db.select().from(pushSubscriptions).where(eq(pushSubscriptions.userId, userId));

    return NextResponse.json(devices, {status: 200})
}