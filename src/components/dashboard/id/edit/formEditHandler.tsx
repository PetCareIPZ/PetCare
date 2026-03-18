"use server";

import { revalidatePath } from 'next/cache';
import { getAnimalById, updateAnimal } from "~/server/animal/animal.service";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function formEditHandler(formData: FormData) {
    const { userId } = await auth();
    const user = userId ? await currentUser() : null;

    if (!userId || !user) {
        return { error: "Zaloguj się, aby móc edytować dane." };
    }

    const petIdRaw = formData.get('petId') as string;
    const petId = parseInt(petIdRaw);

    const animal = await getAnimalById(petId, user.id);
    if (!animal || animal.length === 0) {
        return { error: "Zwierzę nie zostało znalezione." };
    }

    const updatedData = {
        petId: petId,
        petName: formData.get('imie') as string,
        species: formData.get('gatunek') as string,
        race: formData.get('rasa') as string,
        sex: formData.get('plec') as string,
        birthDate: formData.get('data-urodzenia') as string,
        weight: formData.get('waga') as string,
        chipNumber: formData.get('czip') as string,
        imageUrl: formData.get('imageUrl') as string
    };

    try {
        await updateAnimal(updatedData, user.id);
        
        revalidatePath(`/dashboard/${petId}`);
        revalidatePath(`/dashboard/animals`);
        
        return { success: true, petId: petId };
    } catch (error) {
        return { error: error instanceof Error ? error.message : "Błąd serwera" };
    }
}