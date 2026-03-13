"use server";
import { db } from "~/server/db/index";
import { visits } from "~/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function funt2(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Brak autoryzacji");
  
  const facilityIdAsString = formData.get("facilityId");

  const facilityId = facilityIdAsString && facilityIdAsString !== "" 
    ? Number(facilityIdAsString) 
    : null;

  await db.insert(visits).values({
    petId: Number(formData.get("petId")),
    facilityId: facilityId,
    visitDate: formData.get("data") as string,
    visitType: formData.get("rodzaj_wizyty") as string,
    visitNote: formData.get("uwagi") as string,
    visitAttachment:formData.get("załączniki") as string
  });

  revalidatePath("/dashboard/visits");
  redirect("/dashboard/visits");
}