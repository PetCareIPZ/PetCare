'use server';

import { redirect } from 'next/navigation'
import { auth, currentUser } from "@clerk/nextjs/server";
import { addDrug, getAnimalById } from "~/server/animal/animal.service";

export default async function formAddDrugHandler(drugFormData : FormData){
    const { isAuthenticated } = await auth();
    const user = isAuthenticated ? await currentUser() : null;

    if (!isAuthenticated || !user) {
        redirect("/dashboard/error?message=Zaloguj się aby móc wysłać formularz")
    }

    const petId = drugFormData.get("petId") as string;
    getAnimalById(parseInt(petId), user.id).then((animal) => {
        if (!animal || animal.length === 0) {
            redirect("/dashboard/error?message=Zwierzę nie zostało znalezione")
        }
    }).catch((error : unknown) => {
        const message = error instanceof Error ? error.message : "An unknown error occurred";
        redirect("/dashboard/error?message=" + message);
    });


    try{
        await addDrug({
            petId: parseInt(drugFormData.get("petId") as string),
            drugType: drugFormData.get("drugType") as string,
            drugDate: drugFormData.get("drugDate") as string,
            drugDose: drugFormData.get("drugDose") as string,
            drugNote: drugFormData.get("drugNote") as string
        })
    }catch(error){
        redirect("/dashboard/error?message=" + (error as Error).message);
    }

    redirect("/dashboard/" + petId + "/health-card");
}