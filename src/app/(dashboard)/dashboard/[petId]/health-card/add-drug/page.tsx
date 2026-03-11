import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { db } from "~/server/db";
import { and, eq } from "drizzle-orm";
import { pets } from "~/server/db/schema";
import { AddDrugForm } from "~/components/dashboard/id/health-card/formAddDrug";

export default async function Page({ params }: { params: Promise<{ petId: string }> }){
  const { petId } = await params;
  const { isAuthenticated } = await auth();
  const user = isAuthenticated ? await currentUser() : null;

  if (!isAuthenticated || !user) {
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
        <AddDrugForm petId={petId}/>
    ) 
}