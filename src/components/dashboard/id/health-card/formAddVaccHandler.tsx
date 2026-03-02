'use server';

import { redirect } from 'next/navigation'
import { auth, currentUser } from "@clerk/nextjs/server";
import { addVacc } from "~/server/animal/animal.service";

export default async function formAddVaccHandler(vaccFormData : FormData){
        const { isAuthenticated } = await auth();
        const user = isAuthenticated ? await currentUser() : null;

    if (!isAuthenticated) {
        redirect("/dashboard/error?message=Zaloguj się aby móc wysłać formularz")
    }
    console.log("form data: ", vaccFormData);
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

    redirect("/dashboard/" + vaccFormData.get("petId") + "/health-card");
}