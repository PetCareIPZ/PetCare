"use server";

import { db } from "~/server/db/index";
import { visits } from "~/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

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