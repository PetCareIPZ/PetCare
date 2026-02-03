import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import StatsCard from "~/components/dashboard/StatsCard";
import AnimatedSection from "~/components/public/ui/AnimatedSection";
import { db } from "~/server/db";
import { pets, visits, drugs, vaccinations } from "~/server/db/schema";
import { eq, inArray, count } from "drizzle-orm";

export default async function DashboardPage() {
  const { isAuthenticated } = await auth();
  const user = isAuthenticated ? await currentUser() : null;

  if (!isAuthenticated) {
    return (
      <div className="text-center mt-20 text-red-400">
        <a href="/" className="underline">Zaloguj się</a> aby uzyskać dostęp do tej strony.
      </div>
    );
  }

  const userId = user?.id!;

  // Pobierz zwierzęta
  const userPets = await db
    .select({
      petId: pets.petId,
      petName: pets.petName,
      species: pets.species,
    })
    .from(pets)
    .where(eq(pets.userId, userId));

  const petIds = userPets.map((p) => p.petId);

  // Pobierz liczbę wizyt, leków i szczepionek
  let visitsCount = 0;
  let drugsCount = 0;
  let vaccinationsCount = 0;

  if (petIds.length > 0) {
    try {
      const [visitsCounts, drugsCounts, vaccinationsCounts] = await Promise.all([
        db
          .select({ count: count() })
          .from(visits)
          .where(inArray(visits.petId, petIds)),
        db
          .select({ count: count() })
          .from(drugs)
          .where(inArray(drugs.petId, petIds)),
        db
          .select({ count: count() })
          .from(vaccinations)
          .where(inArray(vaccinations.petId, petIds)),
      ]);
      
      visitsCount = visitsCounts[0]?.count || 0;
      drugsCount = drugsCounts[0]?.count || 0;
      vaccinationsCount = vaccinationsCounts[0]?.count || 0;
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  }

  return (
    <>
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800">
        📊 Podsumowanie
      </h1>

      {/* <h1 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800">
        Witaj, {user?.firstName}! 👋
      </h1> */}

      <AnimatedSection>
        <section className="mb-16">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/dashboard/zwierzaki" className="transition hover:opacity-80">
              <StatsCard title="Zwierzaki" value={userPets.length} />
            </Link>

            <Link href="/dashboard/wizyty" className="transition hover:opacity-80">
              <StatsCard title="Wizyty" value={visitsCount} />
            </Link>

            <Link href="/dashboard/leki" className="transition hover:opacity-80">
              <StatsCard title="Leki" value={drugsCount} />
            </Link>

            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
              <h3 className="text-lg font-medium text-gray-700">Szczepionki</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">{vaccinationsCount}</p>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Twoje zwierzęta
          </h2>
          {userPets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userPets.map((pet) => (
                <Link
                  key={pet.petId}
                  href={`/dashboard/${pet.petId}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg shadow-md p-6 transition duration-200 hover:shadow-lg hover:bg-gray-50 border border-transparent hover:border-purple-200 cursor-pointer">
                    <div className="text-2xl mb-2">
                      {pet.species === "dog" && "🐕"}
                      {pet.species === "cat" && "🐈"}
                      {pet.species === "bird" && "🦜"}
                      {pet.species === "rabbit" && "🐰"}
                      {!["dog", "cat", "bird", "rabbit"].includes(pet.species || "") && "🐾"}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-purple-600">
                      {pet.petName}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {pet.species === "dog" && "Pies"}
                      {pet.species === "cat" && "Kot"}
                      {pet.species === "bird" && "Ptak"}
                      {pet.species === "rabbit" && "Królik"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600 mb-4">Nie masz jeszcze żadnych zwierząt</p>
              <Link
                href="/dashboard/dodaj"
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition"
              >
                + Dodaj zwierzaka
              </Link>
            </div>
          )}
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Co nowego?
          </h2>
          <div className="space-y-4 text-gray-600">
            {visitsCount === 0 ? (
              <p>• Nie masz zaplanowanych wizyt</p>
            ) : (
              <p>• Masz {visitsCount} {visitsCount === 1 ? "wizytę" : "wizyt"}</p>
            )}
            {drugsCount === 0 ? (
              <p>• Nie masz wpisanych leków</p>
            ) : (
              <p>• Podajesz {drugsCount} {drugsCount === 1 ? "lek" : "leki"}</p>
            )}
            {vaccinationsCount === 0 ? (
              <p>• Nie masz zanotowanych szczepionek</p>
            ) : (
              <p>• Zwierzęta mają {vaccinationsCount} {vaccinationsCount === 1 ? "szczepionkę" : "szczepionek"}</p>
            )}
          </div>
        </section>
      </AnimatedSection>
    </>
  );
}
