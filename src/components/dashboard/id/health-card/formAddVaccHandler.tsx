'use server';

import { redirect } from 'next/navigation'
import { auth, currentUser } from "@clerk/nextjs/server";
import { addVacc, getAnimalById } from "~/server/animal/animal.service";

export default async function formAddVaccHandler(vaccFormData : FormData){
    const { isAuthenticated } = await auth();
    const user = isAuthenticated ? await currentUser() : null;

    
    if (!isAuthenticated) {
        redirect("/dashboard/error?message=Zaloguj się aby móc wysłać formularz")
    }
    
    const petId = vaccFormData.get("petId") as string;
    getAnimalById(parseInt(petId), user.id).then((animal) => {
        if (!animal || animal.length === 0) {
            redirect("/dashboard/error?message=Zwierzę nie zostało znalezione")
        }
    }).catch((error : unknown) => {
        const message = error instanceof Error ? error.message : "An unknown error occurred";
        redirect("/dashboard/error?message=" + message);
    });

    try{
        await addVacc({
            petId: parseInt(vaccFormData.get("petId") as string),
            vaccType: vaccFormData.get("vaccType") as string,
            vaccDate: vaccFormData.get("vaccDate") as string,
            vaccDose: vaccFormData.get("vaccDose") as string,
            vaccNote: vaccFormData.get("vaccNote") as string
        })
    }catch(error){
        redirect("/dashboard/error?message=" + (error as Error).message);
    }


    redirect("/dashboard/" +  petId + "/health-card");
}