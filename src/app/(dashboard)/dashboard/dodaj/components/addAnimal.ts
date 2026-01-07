"use server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "~/server/db";
import { pets } from "~/server/db/schema";

export async function addAnimal(formData: FormData){
    const { isAuthenticated } = await auth();
    const user = isAuthenticated ? await currentUser() : null;
    
    if (!isAuthenticated){
        throw new Error("Zaloguj się aby móc wysłać formularz");
    }

    const animal = {
        userId: user?.id as string,
        name: formData.get('imie') as string,
        race: formData.get('rasa') as string,
        species: formData.get('gatunek') as string,
        sex: formData.get('plec') as string,
        dateOfBirth: formData.get('data-urodzenia') as string,
        weight: formData.get('waga') as string,
        chipNumber: formData.get('czip') as string,
    };
    
    await db.insert(pets).values({
        userId: animal.userId,
        petName: animal.name,
        species: animal.species,
        race: animal.race,
        sex: animal.sex,
        birthDate: animal.dateOfBirth,
        weight: animal.weight,
        chipNumber: animal.chipNumber,
        imageUrl: "/svg/no-image.svg"
    });
    
    redirect("/dashboard");
}