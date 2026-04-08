import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getVaccForUser, getAnimals } from "~/server/animal/animal.service";
import EditVaccinationForm from "../add/EditVaccForm"; // Upewnij się, że ścieżka jest poprawna

export default async function EditVaccinationPage(props: {
  searchParams: Promise<{ id?: string }>;
}) {
  const searchParams = await props.searchParams;
  const vaccId = searchParams.id;

  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  if (!vaccId) {
    redirect("/dashboard/vaccinations");
  }

  // Pobieramy szczepienie korzystając z nowej funkcji
  const vacc = await getVaccForUser(Number(vaccId), userId);

  const rawPets = await getAnimals(userId);
  const petOptions = rawPets.map(p => ({
    petId: p.petId,
    petName: p.petName
  }));

  if (!vacc) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold">Nie znaleziono szczepienia</h2>
        <p className="text-gray-600">Szczepienie nie istnieje lub nie masz uprawnień.</p>
      </div>
    );
  }

  const initialData = {
    vaccId: vacc.vaccinationId,
    petId: vacc.petId,
    vaccType: vacc.vaccinationType,
    vaccDate: vacc.vaccinationDate,
    vaccDose: vacc.vaccinationDose,
    vaccNote: vacc.vaccinationNote,
  };

  return (
    <div className="container mx-auto">
      <EditVaccinationForm 
        initialData={initialData} 
        pets={petOptions} 
      />
    </div>
  );
}