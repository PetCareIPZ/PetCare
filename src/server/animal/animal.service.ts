"use server";
import { auth, currentUser, type User } from "@clerk/nextjs/server";
import { db } from "~/server/db/index";
import { pets } from "~/server/db/schema";
import { and, eq } from 'drizzle-orm';
import { NextResponse } from "next/server";
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

    try{
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
        return NextResponse.json({message: "Success",},{status: 200});
    }catch(error){
        return NextResponse.json({error: error,},{status: 500});

    }
}

// change to use userId as an argument and prepare for usage in api route
export async function deleteAnimal(petId: number, userId :string){

    await db.delete(pets).where(
        and(
            eq(pets.userId, userId),
            eq(pets.petId, petId)
        )
    );
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
            eq(pets.petId, parseInt(formData.get('petId') as string))
        )
    );
    // add error handling and response
}

// add error handling and response
export async function getAnimals(id : string){
    return db.select().from(pets).where(eq(pets.userId,id));
}