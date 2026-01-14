"use server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "~/server/db/index";
import { pets } from "~/server/db/schema";
import { and, eq } from 'drizzle-orm';
////////////////////////////////////////////////////////////////
// remove authentication from all methods and guard them via routes
////////////////////////////////////////////////////////////////

// change to use json as an argument
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
    // add error handling and response 
}

// change to use userId as an argument and prepare for usage in api route
export async function deleteAnimal(petId: number){
    const { isAuthenticated } = await auth();
    const user = isAuthenticated ? await currentUser() : null;
    
    if (!isAuthenticated){
        throw new Error("Zaloguj się aby móc usunąć zwierzę");
    }

    await db.delete(pets).where(
        and(
            eq(pets.userId, user?.id!),
            eq(pets.petId, petId)
        )
    );
    // add error handling and response 
}
export async function updateAnimal(formData: FormData){
    const { isAuthenticated } = await auth();
    const user = isAuthenticated ? await currentUser() : null;
    
    if (!isAuthenticated){
        throw new Error("Zaloguj się aby móc edytować zwierzę");
    }

    console.log("---------------------FORM DATA---------------------");
    console.log(formData);
    console.log("---------------------FORM DATA---------------------");

    await db.update(pets).set({
        petName: formData.get('imie') as string,
        species: formData.get('gatunek') as string,
        race: formData.get('rasa') as string,
        sex: formData.get('plec') as string,
        birthDate: formData.get('data-urodzenia') as string,
        weight: formData.get('waga') as string,
        chipNumber: formData.get('czip') as string
    }).where(
        and(
            eq(pets.userId, user?.id!),
            eq(pets.petId, parseInt(formData.get('petId')))
        )
    );
    // add error handling and response
}

// add error handling and response
export async function getAnimals(id : string){
    return db.select().from(pets).where(eq(pets.userId,id));
}