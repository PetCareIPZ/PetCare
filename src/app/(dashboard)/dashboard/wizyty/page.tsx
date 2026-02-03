import { auth, currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { db } from "~/server/db/index";
import { visits } from "~/server/db/schema";
import { pets } from "~/server/db/schema";
import AnimatedSection from "~/components/public/ui/AnimatedSection";

export default async function WizytePage() {
  const { userId } = await auth();
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    return (
      <div className="text-center mt-20 text-red-400">
        <a href="/" className="underline">Zaloguj się</a> aby uzyskać dostęp do tej strony.
      </div>
    );
  }

  const user = await currentUser();

  async function getPets(userId: string) {
    if (!userId) return [];
    return db
      .select({
        petId: pets.petId,
        petName: pets.petName,
        species: pets.species,
      })
      .from(pets)
      .where(eq(pets.userId, userId));
  }

  const userPets = userId ? await getPets(userId) : [];

  function pluralizeZwierze(n: number) {
    if (n === 1) return "zwierzę";
    if (n >= 2 && n <= 4) return "zwierzęta";
    return "zwierząt";
  }

  return (
    <>
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800">
        📅 Wizyty
      </h1>

      <AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <Link href="/dashboard/wizyty/rejestracja_wizyt">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl shadow-md p-8 hover:shadow-lg transition cursor-pointer h-full">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Nowa wizyta</h3>
                  <p className="text-gray-600">Zarejestruj wizytę weterynaryjną</p>
                </div>
                <div className="text-4xl">🗓️</div>
              </div>
            </div>
          </Link>

          <Link href="/dashboard/zwierzaki">
            <div className="bg-gradient-to-br from-blue-50 to-blue-5 rounded-2xl shadow-md p-8">
                <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Twoje zwierzaki</h3>
                    <p className="text-gray-600">
                    {userPets.length === 0 ? "Brak zwierzaków" : `${userPets.length} ${pluralizeZwierze(userPets.length)}`}
                    </p>
                </div>
                <div className="text-4xl">🐾</div>
                </div>
            </div>
          </Link>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Zaplanowane wizyty</h3>
          <div className="bg-white rounded-2xl shadow-md p-8 text-center border border-gray-100">
            <div className="text-5xl mb-4">📋</div>
            <p className="text-gray-600 mb-2">Brak zaplanowanych wizyt</p>
            <p className="text-sm text-gray-500">Zaplanowana wizyta pojawi się tutaj</p>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <section>
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Historia wizyt</h3>
          <div className="bg-white rounded-2xl shadow-md p-8 text-center border border-gray-100">
            <div className="text-5xl mb-4">✅</div>
            <p className="text-gray-600 mb-2">Brak zakończonych wizyt</p>
            <p className="text-sm text-gray-500">Ukończone wizyty pojawią się tutaj</p>
          </div>
        </section>
      </AnimatedSection>
    </>
  );
}
