"use server";

import { db } from "~/server/db/index";
import { visits } from "~/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { eq } from 'drizzle-orm';

export async function funt2(formData: FormData) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { error: "Brak autoryzacji. Zaloguj się ponownie." };
    }
    
    const facilityIdAsString = formData.get("facilityId");
    const facilityId = facilityIdAsString && facilityIdAsString !== "" 
      ? Number(facilityIdAsString) 
      : null;
    
    const dateString = formData.get("data") as string;
    await db.insert(visits).values({
      petId: Number(formData.get("petId")),
      facilityId: facilityId,
      visitDate: new Date(dateString),
      visitType: formData.get("rodzaj_wizyty") as string,
      visitNote: formData.get("uwagi") as string,
      visitAttachment: formData.get("załączniki") as string
    });

    revalidatePath("/dashboard/visits");

    return { success: true };

  } catch (error) {
    console.error("Database Error:", error);
    return { 
      error: "Wystąpił błąd podczas zapisywania wizyty w bazie danych." 
    };
  }
}


export async function updateVisit(formData: FormData) {
  try {
    const { userId } = await auth();
    if (!userId) return { error: "Brak autoryzacji." };

    const visitId = Number(formData.get("visitId"));
    if (!visitId) return { error: "Brak ID wizyty." };

    const facilityIdRaw = formData.get("facilityId");
    const facilityId = facilityIdRaw && facilityIdRaw !== "" ? Number(facilityIdRaw) : null;

    await db.update(visits)
      .set({
        petId: Number(formData.get("petId")),
        facilityId: facilityId,
        visitDate: new Date(formData.get("data") as string),
        visitType: formData.get("rodzaj_wizyty") as string,
        visitNote: formData.get("uwagi") as string,
        visitAttachment: formData.get("załączniki") as string,
        isNotified: false 
      })
      .where(eq(visits.visitId, visitId));

    revalidatePath("/dashboard/visits");
    return { success: true };
  } catch (error) {
    console.error("Update Error:", error);
    return { error: "Nie udało się zaktualizować wizyty." };
  }
}

export async function deleteVisit(visitId: number) {
  try {
    const { userId } = await auth();
    if (!userId) return { error: "Brak autoryzacji." };

    await db.delete(visits)
      .where(eq(visits.visitId, visitId));

    return { success: true };
  } catch (error) {
    console.error("Delete Error:", error);
    return { error: "Błąd podczas usuwania wizyty." };
  }
}