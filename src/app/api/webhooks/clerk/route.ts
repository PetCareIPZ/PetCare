import { Webhook } from "svix"; // weryfikacja webhooka
import { headers } from "next/headers";

import { db } from "~/server/db";
import { users } from "~/server/db/schema";

import { eq } from "drizzle-orm";

export async function POST(req: Request){
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

    const body = await req.text();

    const headerPayload = await headers();

    const svixId = headerPayload.get("svix-id");
    const svixTimestamp = headerPayload.get("svix-timestamp");
    const svixSignature = headerPayload.get("svix-signature");

    if (!svixId || !svixTimestamp || !svixSignature) {
        return new Response("Missing svix headers", { status: 400 });
    }

    const wh = new Webhook(WEBHOOK_SECRET!);

    let event:any;

    try{
        event = wh.verify(body,{
            "svix-id": svixId,
            "svix-timestamp": svixTimestamp, 
            "svix-signature": svixSignature,
        });
    }catch(err){
        console.log("Invalid signature", err);
        return new Response("Invalid signature", {status: 400});
    }

    
    const { type, data } = event; 

    const email = data.email_addresses?.[0]?.email_address ?? "";
    const firstName = data.first_name ?? "";
    const lastName = data.last_name ?? "";
    
    
    if (type === "user.created") {
        await db.insert(users).values({
        clerkId: data.id,
        email,
        firstName,
        lastName
    });
    console.log("User inserted:", data.id);
    }

    if (type === "user.updated") {
        await db
        .update(users)
        .set({
        email,
        firstName,
        lastName
    })
    .where(eq(users.clerkId, data.id));

    console.log("User updated:", data.id);
    }


    if (type === "user.deleted") {
        await db
        .delete(users)
        .where(eq(users.clerkId, data.id));
    }
    

    console.log("User deleted:", data.id);
    


    return new Response("OK", { status: 200 });
}