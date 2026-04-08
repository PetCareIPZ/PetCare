import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getDrugForUser, getAnimals } from "~/server/animal/animal.service";
import EditDrugForm from "../add/EditDrugForm";

// 1. Zmieniamy typ searchParams na Promise
export default async function EditDrugPage(props: {
  searchParams: Promise<{ id?: string }>;
}) {
  // 2. Musimy najpierw wyciągnąć (odczekać) parametry
  const searchParams = await props.searchParams;
  const drugId = searchParams.id;

  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  // Jeśli brak ID w URL, wróć do listy
  if (!drugId) {
    redirect("/dashboard/drugs");
  }

  // Pobierz dane leku, sprawdzając uprawnienia
  const drug = await getDrugForUser(Number(drugId), userId);

  // Pobierz listę zwierzaków użytkownika do selecta
  const rawPets = await getAnimals(userId);
  const petOptions = rawPets.map(p => ({
    petId: p.petId,
    petName: p.petName
  }));

  if (!drug) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold">Nie znaleziono leku</h2>
        <p className="text-gray-600">Lek nie istnieje lub nie masz uprawnień do jego edycji.</p>
      </div>
    );
  }

  const initialData = {
    drugId: drug.drugId,
    petId: drug.petId,
    drugType: drug.drugType,
    drugDate: drug.drugDate,
    drugDose: drug.drugDose,
    drugNote: drug.drugNote,
  };

  return (
    <div className="container mx-auto">
      <EditDrugForm 
        initialData={initialData} 
        pets={petOptions} 
      />
    </div>
  );
}