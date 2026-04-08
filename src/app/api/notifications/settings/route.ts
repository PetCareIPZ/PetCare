import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { notificationSettings } from "~/server/db/schema";
import { eq } from 'drizzle-orm';

interface setSettingsNotifications{
    mailEnabled: boolean | undefined,
    pushEnabled: boolean | undefined
}


export async function GET(): Promise<Response> {
  const { userId } = await auth();

    if (!userId) {  
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  
    const settings = await db.select().from(notificationSettings).where(eq(notificationSettings.userId, userId));
    if(settings.length == 0){
          await db.insert(notificationSettings)
        .values({ userId })
        .onConflictDoNothing();
    }

    return NextResponse.json(settings[0], {status: 200})
}

export async function POST(req: Request): Promise<Response>{
    const { userId } = await auth();

    if (!userId) {  
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const change : setSettingsNotifications = await req.json();
    // console.log(change)
    await db.update(notificationSettings).set(change).where(eq(notificationSettings.userId,userId))
    
    return NextResponse.json({body: "Updated"},{status: 200})
}