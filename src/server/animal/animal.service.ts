"use server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "~/server/db/index";
import { pets } from "../db/schema";
import { eq } from 'drizzle-orm';

export async function addAnimal(formData: FormData){
    const { isAuthenticated } = await auth();
    const user = isAuthenticated ? await currentUser() : null;
    
    if (!isAuthenticated){
        throw new Error("Zaloguj się aby móc wysłać formularz");
    }


    // console.log("---------------------FORM DATA---------------------");
    // console.log(formData);
    // console.log("---------------------FORM DATA---------------------");

    const animal = {
        userId: user?.id! as string,
        name: formData.get('imie') as string,
        race: formData.get('rasa') as string,
        species: formData.get('gatunek') as string,
        sex: formData.get('plec') as string,
        dateOfBirth: formData.get('data-urodzenia') as string,
        weight: formData.get('waga') as string,
        chipNumber: formData.get('czip') as string,
        imageUrl: formData.get('imageUrl') == "" ? "/svg/no-image.svg" : formData.get('imageUrl' as string)
    };
    // console.log("---------------------ANIMAL---------------------");
    // console.log(animal);
    // console.log("---------------------ANIMAL---------------------");


    await db.insert(pets).values({
        userId: animal.userId,
        petName: animal.name,
        species: animal.species,
        race: animal.race,
        sex: animal.sex,
        birthDate: animal.dateOfBirth,
        weight: animal.weight,
        chipNumber: animal.chipNumber,
        imageUrl: animal.imageUrl as string
    });
}

export async function getAnimals(id : string){
    return db.select().from(pets).where(eq(pets.userId,id));
}