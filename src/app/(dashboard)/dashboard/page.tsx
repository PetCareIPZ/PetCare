import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import StatsCard from "~/components/dashboard/StatsCard";
import AnimatedSection from "~/components/public/ui/AnimatedSection";
import Icon from "~/components/Icon";
import { db } from "~/server/db";
import { pets, visits, drugs, vaccinations } from "~/server/db/schema";
import { eq, inArray, count } from "drizzle-orm";
import SavedArticlesPreview from "~/app/(dashboard)/dashboard/SavedArticlesPreview";
import { NotificationInitializer } from "~/components/notifications/NotificationInit";
import { userAgent } from "next/server";
import type { userDev } from "~/types/userDev";

import { UAParser } from 'ua-parser-js'
import { headers } from "next/headers";
export default async function DashboardPage() {
  const { isAuthenticated } = await auth();
  const user = isAuthenticated ? await currentUser() : null;

  if (!isAuthenticated || !user) {
    return (
      <div className="text-center mt-20 text-red-400">
        <Link href="/" className="underline">Zaloguj się</Link> aby uzyskać dostęp do tej strony.
      </div>
    );
  }

  const userPets = await db
    .select({
      petId: pets.petId,
      petName: pets.petName,
      species: pets.species,
    })
    .from(pets)
    .where(eq(pets.userId, user.id));

  const petIds = userPets.map((p) => p.petId);

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
      
      visitsCount = visitsCounts[0]?.count ?? 0;
      drugsCount = drugsCounts[0]?.count ?? 0;
      vaccinationsCount = vaccinationsCounts[0]?.count ?? 0;
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  }
  
  const uaString = (await headers()).get('user-agent') ?? '';

  const ua = UAParser(uaString);
  const userDevData = {
    type: ua.device.type,
    model: ua.device.model,
    vendor: ua.device.vendor,
    os: ua.os.name,
    engine: ua.engine.name,
  } as userDev

  return (
    <>
      <NotificationInitializer userDevData={userDevData} />
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800">
        <Icon name="chart" /> Podsumowanie
      </h1>

      {/* <h1 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800">
        Witaj, {user?.firstName}! 👋
      </h1> */}

      <AnimatedSection>
        <section className="mb-16">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/dashboard/animals" className="transition hover:opacity-80">
              <StatsCard title="Zwierzaki" value={userPets.length} />
            </Link>

            <Link href="/dashboard/visits" className="transition hover:opacity-80">
              <StatsCard title="Wizyty" value={visitsCount} />
            </Link>

            <Link href="/dashboard/drugs" className="transition hover:opacity-80">
              <StatsCard title="Leki" value={drugsCount} />
            </Link>

            <Link href="/dashboard/vaccinations" className="transition hover:opacity-80">
              <StatsCard title="Szczepionki" value={vaccinationsCount} />
            </Link>

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
                      {pet.species === "dog" && <Icon name="dog" />}
                      {pet.species === "cat" && <Icon name="cat" />}
                      {pet.species === "bird" && <Icon name="paw" />}
                      {pet.species === "rabbit" && <Icon name="paw" />}
                      {!["dog", "cat", "bird", "rabbit"].includes(pet.species || "") && <Icon name="paw" />}
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
                href="/dashboard/add"
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition"
              >
                + Dodaj zwierzaka
              </Link>
            </div>
          )}
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.05}>
         <SavedArticlesPreview />
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <section className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Co nowego?
        </h2>
        <div className="flex flex-col gap-4">
          {/* Link do Wizyt */}
          <Link 
            href="/dashboard/visits" 
            className="group flex items-center text-gray-600 transition-colors"
          >
            <span className="mr-2 text-gray-400">•</span>
            {visitsCount === 0 ? (
              <p>Nie masz zaplanowanych wizyt</p>
            ) : (
              <p>Masz <span>{visitsCount}</span> {visitsCount === 1 ? "wizytę" : "wizyt"}</p>
            )}
          </Link>

          {/* Link do Leków */}
          <Link 
            href="/dashboard/drugs" 
            className="group flex items-center text-gray-600 transition-colors"
          >
            <span className="mr-2 text-gray-400">•</span>
            {drugsCount === 0 ? (
              <p>Nie masz wpisanych leków</p>
            ) : (
              <p>Podajesz <span>{drugsCount}</span> {drugsCount === 1 ? "lek" : "leki"}</p>
            )}
          </Link>

          {/* Link do Szczepień */}
          <Link 
            href="/dashboard/vaccinations" 
            className="group flex items-center text-gray-600 transition-colors"
          >
            <span className="mr-2 text-gray-400">•</span>
            {vaccinationsCount === 0 ? (
              <p>Nie masz zanotowanych szczepionek</p>
            ) : (
              <p>Zwierzęta mają <span>{vaccinationsCount}</span> {vaccinationsCount === 1 ? "szczepionkę" : "szczepionek"}</p>
            )}
          </Link>
        </div>
      </section>
      </AnimatedSection>
    </>
  );
}
