// src/app/dashboard/visits/edit/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getVisitForUser } from "~/server/animal/animal.service";
// TUTAJ IMPORTUJESZ SWÓJ KOMPONENT Z KOMPONENTÓW
import EditVisitForm from "~/components/dashboard/visits/EditVisitForm"; 

export default async function Page({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  // Pobieramy ID z adresu URL (?id=101)
  const params = await searchParams;
  const visitId = Number(params.id);

  // Zabezpieczenie przed NaN
  if (!params.id || isNaN(visitId)) {
    redirect("/dashboard/visits");
  }

  // Pobieramy dane wizyty z bazy danych
  const visit = await getVisitForUser(visitId, userId);
  
  if (!visit) {
    redirect("/dashboard/visits");
  }

  // Wyświetlamy Twój formularz i przekazujemy mu dane
  return <EditVisitForm initialData={visit} />;
}