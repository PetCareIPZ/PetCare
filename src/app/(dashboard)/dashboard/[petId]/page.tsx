import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { db } from "~/server/db";
import { pets } from "~/server/db/schema";
import { and, eq } from "drizzle-orm";
import AnimalDetailContent from "~/components/dashboard/id/AnimalDetailContent";

interface PageProps {
  params: {
    petId: string;
  };
}

export default async function animalDashboard({params}: PageProps) {
    const {petId} = params; 
    const { isAuthenticated } = await auth();
    const user = isAuthenticated ? await currentUser() : null;
    if (!isAuthenticated) {
        return (
            <div className="text-center mt-20 text-red-400">
            <Link href="/"> <a style={{ textDecoration: "underline" }}>Zaloguj się</a><a> aby uzyskać dostęp do tej strony</a></Link> 
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
    }

    const petData = animal[0];

    return <AnimalDetailContent animal={petData} />;
}