"use server";

import { redirect } from 'next/navigation'
import { deleteAnimal } from "~/server/animal/animal.service";

export default async function(userId : string, animalId : number){
    deleteAnimal(animalId);
    // todo: add error handling
    redirect(`/dashboard`)
}