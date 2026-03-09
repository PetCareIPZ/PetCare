"use server";

import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation'
import { addAnimal } from "~/server/animal/animal.service"; 
export default async function addAnimalFormHandler(addAnimalFormData : FormData){
    const { isAuthenticated } = await auth();
    const user = isAuthenticated ? await currentUser() : null;
    
    if(!isAuthenticated || !user){
        redirect("/dashboard/error?message=Zaloguj się aby móc wysłać formularz")
    }
    let newPetId = 0;
    try{
        const newPet = await addAnimal({
            userId: user!.id,
            name: addAnimalFormData.get('imie') as string,
            race: addAnimalFormData.get('rasa') as string,
            species: addAnimalFormData.get('gatunek') as string,
            sex: addAnimalFormData.get('plec') as string,
            dateOfBirth: addAnimalFormData.get('data-urodzenia') as string,
            weight: addAnimalFormData.get('waga') as string,
            chipNumber: addAnimalFormData.get('czip') as string,
            imageUrl: addAnimalFormData.get('imageUrl') != null ? addAnimalFormData.get('imageUrl') as string : "/svg/no-image.svg" 
        });
        newPetId = newPet[0]!.petId;
    }catch(error){
        redirect("/dashboard/error?message=" + (error as Error).message);
    }
    
    if (newPetId === 0){
        redirect("/dashboard/error?message=Nie udało się dodać zwierzęcia");
    }

    redirect(`/dashboard/${newPetId}`);
}