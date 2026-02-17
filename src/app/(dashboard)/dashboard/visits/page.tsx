import { auth, currentUser } from "@clerk/nextjs/server";
import { eq , inArray} from "drizzle-orm";
import Link from "next/link";
import { db } from "~/server/db/index";
import { visits } from "~/server/db/schema";
import { pets } from "~/server/db/schema";
import AnimatedSection from "~/components/public/ui/AnimatedSection";
import VisitGroup from "~/components/dashboard/visits/VisitGroup";
import type { Visit } from "~/components/dashboard/visits/VisitGroup";
import Icon from "~/components/Icon";

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
    const allVisits = idsZwierzakow.length > 0 ? await Wizyta(idsZwierzakow) : [];
    const today: string = new Date().toISOString().slice(0, 10);
    const ids = allVisits.filter(v => typeof v.visitDate === 'string' && v.visitDate >= today) as Visit[];
    const pastIds = allVisits.filter(v => typeof v.visitDate === 'string' && v.visitDate < today) as Visit[];
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
        <Icon name="calendar" /> Wizyty
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
                <div className="text-4xl"><Icon name="calendar" /></div>
              </div>
            </div>
          </Link>

          <Link href="/dashboard/animals">
            <div className="bg-gradient-to-br from-blue-50 to-blue-5 rounded-2xl shadow-md p-8">
                <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Twoje zwierzaki</h3>
                    <p className="text-gray-600">
                    {pet.length === 0 ? "Brak zwierzaków" : `${pet.length} ${pluralizeZwierze(pet.length)}`}
                    </p>
                </div>
                <div className="text-4xl"><Icon name="paw" /></div>
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

    {pet.map((z) => (
      <VisitGroup
        key={z.id}
        petName={z.petName}
        visits={ids.filter((w) => w.petID === z.id)}
      />
    ))}
  </div>
</section>

      </AnimatedSection>

      {/* finished visits section */}
      <AnimatedSection delay={0.2}>
        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Zakończone wizyty
          </h3>

          <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
            {pet.map((z) => (
              <VisitGroup
                key={z.id}
                petName={z.petName}
                visits={pastIds.filter((w) => w.petID === z.id)}
              />
            ))}
          </div>
        </section>
      </AnimatedSection>
    </>
  );
}
