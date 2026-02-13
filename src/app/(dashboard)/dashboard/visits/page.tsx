import { auth, currentUser } from "@clerk/nextjs/server";
import { eq , inArray} from "drizzle-orm";
import Link from "next/link";
import { db } from "~/server/db/index";
import { visits } from "~/server/db/schema";
import { pets } from "~/server/db/schema";
import AnimatedSection from "~/components/public/ui/AnimatedSection";

export default async function wizyty() {
    const{userId}=await auth();
    async function Zwierz(uzytk:string) {
        if(!uzytk) return[];

        return db

        .select({


            id:pets.petId,

            petName:pets.petName

        })

        .from(pets)

        .where(eq(pets.userId, uzytk));
    }

    const pet=userId ? await Zwierz(userId) : [];


    async function Wizyta(listaId: number[]){

       if (listaId.length === 0) return [];
       return db 
       .select({
        visitID:visits.visitId,
        visitDate:visits.visitDate,
        visitType:visits.visitType,
        visitAttachment:visits.visitAttachment,
        visitNote:visits.visitNote,
        petID:visits.petId
       })
       .from(visits)
       .where(inArray(visits.petId,listaId))
    }
    const idsZwierzakow=pet.map(z=>z.id);
    const ids=idsZwierzakow.length > 0 ? await Wizyta(idsZwierzakow) : [];
    const {isAuthenticated}=await auth()
    if(!isAuthenticated){

        return <div>Sign in to view this DashboardPage</div>

    }

    const user = await currentUser()

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
          <Link href="/dashboard/visits/visit-registration">
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
                    {pet.length === 0 ? "Brak zwierzaków" : `${pet.length} ${pluralizeZwierze(pet.length)}`}
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
  <h3 className="text-2xl font-semibold text-gray-800 mb-6">
    Zaplanowane wizyty
  </h3>

  <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">

    {pet.map((z) => {
      const wizyty_danego_zwierzaka = ids.filter((w) => w.petID === z.id);

      return (
        <div key={z.id} className="mb-6">
          <h4 className="text-lg font-bold text-gray-700 mb-3 flex items-center gap-2">
            🐾 {z.petName}
          </h4>

          {wizyty_danego_zwierzaka.length > 0 ? (
            <div className="space-y-4">
              {wizyty_danego_zwierzaka.map((w) => (
                <div
                  key={w.visitID}
                  className="p-4 rounded-xl border border-gray-100 bg-gray-50 hover:border-blue-300 transition-all"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-blue-600 uppercase text-xs tracking-wider">
                      {w.visitType}
                    </span>
                    <span className="text-sm font-medium text-gray-400">
                      {w.visitDate}
                    </span>
                  </div>

                  <div className="text-gray-700 space-y-2">
                    <p className="text-sm leading-relaxed">
                      <span className="font-semibold text-gray-800">Notatka:</span>{" "}
                      {w.visitNote || "Brak"}
                    </p>

                    {w.visitAttachment && (
                      <div className="flex items-center gap-2 text-xs text-blue-500 font-medium pt-2 border-t border-gray-200">
                        📎 Pobierz
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 italic">
              Brak zaplanowanych wizyt dla tego zwierzaka.
            </p>
          )}
        </div>
      );
    })}
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
