import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { db } from "~/server/db";
import { and, eq } from "drizzle-orm";
import { pets } from "~/server/db/schema";
import { AddVaccForm } from "~/components/dashboard/id/health-card/formAddVacc";

interface PageProps {
  params: {
    petId: string;
  };
}

export default async function Page({params}: PageProps){
  const { petId } = params;
  const { isAuthenticated } = await auth();
  const user = isAuthenticated ? await currentUser() : null;

  if (!isAuthenticated) {
    return (
      <div className="text-center mt-20 text-red-400">
        <Link href="/" className="underline">
          Zaloguj się
        </Link>
        <span> aby uzyskać dostęp do tej strony</span>
      </div>
    );
  }
    
  console.log(petId, parseInt(petId))
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
        <Link href="/dashboard" className="hover:underline">Powrót do pulpitu</Link>
      </div>
    );
  }

    return(
        <AddVaccForm petId={petId}/>
    ) 
}