import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs/server";
import EditAnimalFormWidget from "~/components/dashboard/id/edit/formEditAnimal";
import { db } from "~/server/db";
import { pets } from "~/server/db/schema";
import { eq, and } from "drizzle-orm";

export default async function editPage({ params }: { params: Promise<{ petId: string }> }) {
    const { petId } = await params;
    const { isAuthenticated } = await auth();
    const user = isAuthenticated ? await currentUser() : null;
    if (!isAuthenticated) {
        return (
            <div className="text-center mt-20 text-red-400">
            <Link href="href"> <a style={{ textDecoration: "underline" }}>Zaloguj się</a><a> aby uzyskać dostęp do tej strony</a></Link> 
            </div>
        );
    }
    const animal = await db.select().from(pets).where(
        and(
            eq(pets.userId, user.id),
            eq(pets.petId, parseInt(petId))
        )
    );

    if (!animal || animal.length === 0) {
        return (
            <div className="text-center mt-20 text-red-400">
                <p>Zwierzę nie znalezione</p>
                <Link href="/dashboard">Powrót do pulpitu</Link>
            </div>
        );
    }else{
        return (
            <EditAnimalFormWidget animal={animal[0]!}/>
        )
    }
}