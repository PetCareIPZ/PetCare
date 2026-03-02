'use server';

import { redirect } from 'next/navigation'
import { auth, currentUser } from "@clerk/nextjs/server";
import { addDrug } from "~/server/animal/animal.service";

export default async function formAddDrugHandler(drugFormData : FormData){
        const { isAuthenticated } = await auth();
        const user = isAuthenticated ? await currentUser() : null;

    if (!isAuthenticated) {
        redirect("/dashboard/error?message=Zaloguj się aby móc wysłać formularz")
    }
    console.log("form data: ", drugFormData);
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

    redirect("/dashboard/" + drugFormData.get("petId") + "/health-card");
}