import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs/server";
import {AddAnimalFormWidget} from "~/components/dashboard/dodaj/formAddAnimal";
export default async function dodajPage(){
    const { isAuthenticated } = await auth();
    const user = isAuthenticated ? await currentUser() : null;
    if (!isAuthenticated) {
        return (
            <div className="text-center mt-20 text-red-400">
            <Link href="href"> <a style={{ textDecoration: "underline" }}>Zaloguj się</a><a> aby uzyskać dostęp do tej strony</a></Link> 
            </div>
        );
    }

    return (
        <AddAnimalFormWidget />
    )
}