"use server";

import { auth, currentUser } from '@clerk/nextjs/server';
import { addAnimal } from "~/server/animal/animal.service"; 
import { revalidatePath } from 'next/cache';

export default async function addAnimalFormHandler(addAnimalFormData : FormData){
    const { userId } = await auth();
    const user = userId ? await currentUser() : null;
    
    if(!userId || !user){
        return { error: "Zaloguj się, aby móc wysłać formularz" };
    }

    try {
        const newPet = await addAnimal({
            userId: user.id,
            name: addAnimalFormData.get('imie') as string,
            race: addAnimalFormData.get('rasa') as string,
            species: addAnimalFormData.get('gatunek') as string,
            sex: addAnimalFormData.get('plec') as string,
            dateOfBirth: addAnimalFormData.get('data-urodzenia') as string,
            weight: addAnimalFormData.get('waga') as string,
            chipNumber: addAnimalFormData.get('czip') as string,
            imageUrl: addAnimalFormData.get('imageUrl') ? addAnimalFormData.get('imageUrl') as string : "/svg/no-image.svg" 
        });

        const newPetId = newPet[0]?.petId;

        if (!newPetId) {
            return { error: "Nie udało się uzyskać ID nowego zwierzęcia" };
        }

        revalidatePath('/dashboard/animals');
        return { success: true, petId: newPetId };

    } catch(error) {
        return { error: error instanceof Error ? error.message : "Wystąpił błąd bazy danych" };
    }
}