"use server";

import { auth, currentUser } from '@clerk/nextjs/server';
import { deleteAnimal } from "~/server/animal/animal.service";
import { revalidatePath } from 'next/cache';

export default async function animalDeletionHandler(animalId: number) {
  const { userId } = await auth();
  const user = userId ? await currentUser() : null;
  
  if (!userId || !user) {
    return { error: "Zaloguj się, aby móc usunąć zwierzę" };
  }

  try {
    await deleteAnimal(animalId, user.id);
    
    revalidatePath('/dashboard/animals');
    
    return { success: true };
  } catch (error) {
    console.error("Błąd usuwania:", error);
    return { error: "Wystąpił błąd podczas usuwania zwierzęcia z bazy danych." };
  }
}