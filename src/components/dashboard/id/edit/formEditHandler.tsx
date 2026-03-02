"use server";

import { redirect } from 'next/navigation'
import { getAnimalById, updateAnimal } from "~/server/animal/animal.service";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function formEditHandler(FormData : FormData){
    const { isAuthenticated } = await auth();
    const user = isAuthenticated ? await currentUser() : null;

    if (!isAuthenticated) {
        redirect("/dashboard/error?message=Zaloguj się aby móc wysłać formularz")
    }

    const animal = await getAnimalById(parseInt(FormData.get('petId') as string), user.id);
    
    if(animal === null || animal === undefined || animal.length === 0){ 
        redirect("/dashboard/error?message=Zwierzę nie znalezione")
    }
    
    const petId = FormData.get('petId') as string;

    const updatedData = {
        petId: parseInt(FormData.get('petId') as string),
        petName: FormData.get('imie') as string,
        species: FormData.get('gatunek') as string,
        race: FormData.get('rasa') as string,
        sex: FormData.get('plec') as string,
        birthDate: FormData.get('data-urodzenia') as string,
        weight: FormData.get('waga') as string,
        chipNumber: FormData.get('czip') as string,
        imageUrl: FormData.get('imageUrl') as string
    }

    try{
        await updateAnimal(updatedData, user.id);
    }catch(error){
        redirect("/dashboard/error?message=" + (error as Error).message);
    }
    redirect(`/dashboard/${petId}`);
}