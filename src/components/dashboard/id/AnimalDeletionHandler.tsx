"use server";
import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation'
import { deleteAnimal } from "~/server/animal/animal.service";

export default async function animalDeletionHandler(animalId : number){
    const { isAuthenticated } = await auth();
    const user = isAuthenticated ? await currentUser() : null;
    
    if (!isAuthenticated || !user){
        throw new Error("Zaloguj się aby móc usunąć zwierzę");
    }
    try{
        await deleteAnimal(animalId,user.id);
    }catch(error){
        redirect('/dashboard/error?message=' + (error as Error).message);
    }
    redirect(`/dashboard`)
}