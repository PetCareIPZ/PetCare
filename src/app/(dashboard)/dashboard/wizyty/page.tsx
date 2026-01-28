import { auth, currentUser } from "@clerk/nextjs/server";
import { eq, inArray } from "drizzle-orm";
import Link from "next/link";
import { db } from "~/server/db/index";
import { visits } from "~/server/db/schema";
import {pets} from "~/server/db/schema";
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
   return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <section className="max-w-3xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Twoje wizyty, {user?.firstName}
          </h1>
        </div>

        <div className="flex flex-col gap-8">
          {pet.map((z) => {
            const wizyty_danego_zwierza = ids.filter((w) => w.petID === z.id);

            return (
              <div 
              key={z.id} 
              className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden"
              >
                <div className="bg-gray-800 p-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  🐾 {z.petName}
                </h2>
                </div>
                <div className="p-6">
                {wizyty_danego_zwierza.length > 0 ? (
                  <div className="space-y-4">
                    {wizyty_danego_zwierza.map((w) => (
                      <div 
                        key={w.visitID} 
                        className="p-4 rounded-xl border border-gray-100 bg-gray-50 hover:border-blue-300 transition-all group"
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
                        📎 {w.visitAttachment}
                      </div>
                      )}
                      </div>
                      </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-400 italic py-4">
                      Brak zarejestrowanych wizyt dla tego zwierzaka.
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-12 text-center">
          <Link href="/dashboard/wizyty/rejestracja_wizyt">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-xl shadow-lg transition-transform active:scale-95">
              Zarejestruj nową wizytę
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
