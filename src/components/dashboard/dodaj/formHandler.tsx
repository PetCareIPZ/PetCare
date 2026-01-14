"use server";

import { redirect } from 'next/navigation'
import { addAnimal } from "~/server/animal/animal.service";

export default async function(FormData : any){
    addAnimal(FormData);
    // todo: add error handling
    redirect(`/dashboard`)
}