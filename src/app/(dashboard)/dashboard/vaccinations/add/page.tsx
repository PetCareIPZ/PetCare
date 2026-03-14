import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { db } from "~/server/db/index";
import { pets } from "~/server/db/schema";
import AddVaccinationForm from "./form"; 

export default async function AddVaccinationPage() {
    const { userId } = await auth();

    if (!userId) {
        return <div>Zaloguj się, aby dodać szczepienie.</div>;
    }

    const userPets = await db
        .select({
            petId: pets.petId,
            petName: pets.petName,
        })
        .from(pets)
        .where(eq(pets.userId, userId));

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">

            {userPets.length > 0 ? (
                <AddVaccinationForm pets={userPets} />
            ) : (
                <div className="bg-yellow-50 p-6 rounded-lg shadow-sm">
                    <p className="text-yellow-700 font-semibold">Najpierw musisz dodać zwierzaka do systemu!</p>
                </div>
            )}
        </div>
    );
}