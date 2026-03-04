import { auth, currentUser } from "@clerk/nextjs/server";
import { eq, inArray } from "drizzle-orm";
import Link from "next/link";
import { db } from "~/server/db/index";
import { pets, drugs } from "~/server/db/schema"; 
import AnimatedSection from "~/components/public/ui/AnimatedSection";
import Icon from "~/components/Icon";

export default async function HistoriaLekow() {
    const { userId } = await auth();
    const { isAuthenticated } = await auth();
    
    if (!isAuthenticated) {
        return <div>Zaloguj się, aby wyświetlić tę stronę</div>;
    }
    
    await currentUser();

    async function pobierzZwierzaki(uzytk: string) {
        if (!uzytk) return [];
        return db
            .select({
                id: pets.petId,
                petName: pets.petName
            })
            .from(pets)
            .where(eq(pets.userId, uzytk));
    }

    const pet = userId ? await pobierzZwierzaki(userId) : [];
    const idsZwierzakow = pet.map(z => z.id);

    async function pobierzLeki(listaId: number[]) {
        if (listaId.length === 0) return [];
        return db
            .select() 
            .from(drugs)
            .where(inArray(drugs.petId, listaId));
    }

    const allDrugs = idsZwierzakow.length > 0 ? await pobierzLeki(idsZwierzakow) : [];

    function pluralizeZwierze(n: number) {
        if (n === 1) return "zwierzę";
        if (n >= 2 && n <= 4) return "zwierzęta";
        return "zwierząt";
    }

    return (
        <>
            <h1 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800">
                <Icon name="pills" /> Historia Leków
            </h1>

            <AnimatedSection>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <Link href="/dashboard/drugs/add">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl shadow-md p-8 hover:shadow-lg transition cursor-pointer h-full">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Podaj lek</h3>
                                    <p className="text-gray-600">Zarejestruj nowy lek, tabletkę lub krople</p>
                                </div>
                                <div className="text-4xl"><Icon name="pills" /></div>
                            </div>
                        </div>
                    </Link>

                    <Link href="/dashboard/animals">
                        <div className="bg-gradient-to-br from-indigo-50 to-indigo-5 rounded-2xl shadow-md p-8">
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
                    <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
                        {pet.map((z) => {
                            const petDrugs = allDrugs.filter(d => d.petId === z.id);

                            if (petDrugs.length === 0) return null;

                            return (
                                <div key={z.id} className="mb-8 last:mb-0">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-100">
                                        Pacjent: <span className="text-primary">{z.petName}</span>
                                    </h3>
                                    
                                    <ul className="space-y-4">
                                        {petDrugs.map((d) => (
                                            <li key={d.drugId} className="bg-blue-50/50 rounded-lg p-4 border-l-4 border-blue-500">
                                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                                                    <div>
                                                        <h4 className="font-semibold text-gray-800 text-lg">
                                                            {d.drugType || "Nieznany lek"}
                                                        </h4>
                                                        
                                                        {d.drugDose && (
                                                            <p className="text-sm font-medium text-gray-700 mt-1">
                                                                Dawka: {d.drugDose}
                                                            </p>
                                                        )}

                                                        {d.drugNote && (
                                                            <p className="text-gray-600 mt-1 text-sm italic">{d.drugNote}</p>
                                                        )}
                                                    </div>
                                                    <div className="bg-white px-3 py-1 rounded-md shadow-sm border border-gray-100 text-sm font-medium text-gray-600">
                                                        {d.drugDate ? new Date(d.drugDate).toLocaleDateString('pl-PL') : 'Brak daty'}
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        })}

                        {allDrugs.length === 0 && (
                            <div className="text-center py-8">
                                <p className="text-gray-500 text-lg">Brak zarejestrowanych leków dla Twoich zwierzaków.</p>
                            </div>
                        )}
                    </div>
                </section>
            </AnimatedSection>
        </>
    );
}