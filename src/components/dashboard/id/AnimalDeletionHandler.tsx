"use server";
import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server';
import { deleteAnimal } from "~/server/animal/animal.service";

export default async function(animalId : number){
    const { isAuthenticated } = await auth();
    const user = isAuthenticated ? await currentUser() : null;
    
    if (!isAuthenticated){
        throw new Error("Zaloguj się aby móc usunąć zwierzę");
    }
    try{
        deleteAnimal(animalId,user!.id);
        redirect(`/dashboard`)
    }catch(error){
        redirect('/dashboard')
    }
}