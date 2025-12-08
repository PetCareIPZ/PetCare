import { Webhook } from "svix";
import { headers } from "next/headers";

import { db } from "~/server/db";
import { users } from "~/server/db/schema";

import { eq } from "drizzle-orm";
import type { WebhookEvent } from "@clerk/backend"


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

    let event: WebhookEvent;

    try{
        event = wh.verify(body,{
            "svix-id": svixId,
            "svix-timestamp": svixTimestamp, 
            "svix-signature": svixSignature,
        }) as WebhookEvent;
    }catch(err){
        console.log("Invalid signature", err);
        return new Response("Invalid signature", {status: 400});
    }
    
    try{
        if (event.type === "user.created") {
            const user = event.data
            
            await db.insert(users).values({
            clerkId: user.id,
            email: user.email_addresses?.[0]?.email_address ?? "",
            firstName: user.first_name ?? "",
            lastName: user.last_name ?? ""
        });
        console.log("User inserted:", user.id);
        }

        if (event.type === "user.updated") {
            const user = event.data
            await db
            .update(users)
            .set({
            email:user.email_addresses?.[0]?.email_address ?? "",
            firstName: user.first_name ?? "",
            lastName: user.last_name ?? ""
        })
        .where(eq(users.clerkId, user.id));

        console.log("User updated:", user.id);
        }

    }catch(err){
        console.log("Webhook db error:", err);

        return new Response("Webhook error", {status: 500});
    }

    if (event.type === "user.deleted") {
        const clerkId = event.data.id;

        if(!clerkId){
            console.log("Delete event without id");
            return new Response("Bad request", {status: 400});
        }

        await db
        .delete(users)
        .where(eq(users.clerkId, clerkId));
        
        console.log("User deleted:", clerkId);
    }
    
    return new Response("OK", { status: 200 });
}