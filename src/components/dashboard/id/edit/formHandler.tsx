"use server";

import { redirect } from 'next/navigation'
import { updateAnimal } from "~/server/animal/animal.service";

export default async function(FormData : any){
    updateAnimal(FormData);
    // todo: add error handling
    redirect(`/dashboard`)
}