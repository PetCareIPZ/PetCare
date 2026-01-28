import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { db } from "~/server/db";
import { pets, drugs, vaccinations, visits } from "~/server/db/schema";
import { and, eq } from "drizzle-orm";

export default async function HealthCardPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const { isAuthenticated } = await auth();
    const user = isAuthenticated ? await currentUser() : null;

    if (!isAuthenticated) {
        return (
            <div className="text-center mt-20 text-red-400">
                <Link href="/">
                    <a style={{ textDecoration: "underline" }}>Zaloguj się</a>
                    <a> aby uzyskać dostęp do tej strony</a>
                </Link>
            </div>
        );
    }

    // Verify animal exists and belongs to user
    const animal = await db.select().from(pets).where(
        and(
            eq(pets.userId, user?.id!),
            eq(pets.petId, parseInt(id))
        )
    );

    if (!animal || animal.length === 0) {
        return (
            <div className="text-center mt-20 text-red-400">
                <p>Zwierzę nie znalezione</p>
                <Link href="/dashboard">Powrót do pulpitu</Link>
            </div>
        );
    }

    const petData = animal[0];
    const petId = parseInt(id);

    // Fetch all health data
    const [drugsData, vaccinationsData, visitsData] = await Promise.all([
        db.select().from(drugs).where(eq(drugs.petId, petId)),
        db.select().from(vaccinations).where(eq(vaccinations.petId, petId)),
        db.select().from(visits).where(eq(visits.petId, petId)),
    ]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
            <div className="container mx-auto px-4 py-8">
                <Link href={`/dashboard/${id}`} className="text-blue-400 hover:text-blue-300 mb-6 inline-block">
                    ← Powrót do profilu
                </Link>

                <h1 className="text-4xl font-bold text-white mb-8">Karta Zdrowia - {petData?.petName}</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Leki (Drugs) Column */}
                    <div className="bg-slate-700 rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                             Leki
                        </h2>
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {drugsData.length > 0 ? (
                                drugsData.map((drug) => (
                                    <div key={drug.drugId} className="bg-slate-600 rounded p-4 border-l-4 border-red-500">
                                        <p className="text-white font-semibold">{drug.drugType}</p>
                                        <p className="text-gray-300 text-sm">
                                            <span className="font-medium">Data:</span> {new Date(drug.drugDate).toLocaleDateString('pl-PL')}
                                        </p>
                                        <p className="text-gray-300 text-sm">
                                            <span className="font-medium">Dawka:</span> {drug.drugDose}
                                        </p>
                                        {drug.drugNote && (
                                            <p className="text-gray-400 text-sm mt-2">
                                                <span className="font-medium">Notatka:</span> {drug.drugNote}
                                            </p>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400 italic">Brak wpisów leków</p>
                            )}
                        </div>
                        <button className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition">
                            + Dodaj lek
                        </button>
                    </div>

                    {/* Szczepionki (Vaccinations) Column */}
                    <div className="bg-slate-700 rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                            Szczepionki
                        </h2>
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {vaccinationsData.length > 0 ? (
                                vaccinationsData.map((vaccination) => (
                                    <div key={vaccination.vaccinationId} className="bg-slate-600 rounded p-4 border-l-4 border-blue-500">
                                        <p className="text-white font-semibold">{vaccination.vaccinationType}</p>
                                        <p className="text-gray-300 text-sm">
                                            <span className="font-medium">Data:</span> {new Date(vaccination.vaccinationDate).toLocaleDateString('pl-PL')}
                                        </p>
                                        <p className="text-gray-300 text-sm">
                                            <span className="font-medium">Dawka:</span> {vaccination.vaccinationDose}
                                        </p>
                                        {vaccination.vaccinationNote && (
                                            <p className="text-gray-400 text-sm mt-2">
                                                <span className="font-medium">Notatka:</span> {vaccination.vaccinationNote}
                                            </p>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400 italic">Brak wpisów szczepionek</p>
                            )}
                        </div>
                        <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition">
                            + Dodaj szczepionkę
                        </button>
                    </div>

                    {/* Wizyty (Visits) Column */}
                    <div className="bg-slate-700 rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                            Wizyty
                        </h2>
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {visitsData.length > 0 ? (
                                visitsData.map((visit) => (
                                    <div key={visit.visitId} className="bg-slate-600 rounded p-4 border-l-4 border-green-500">
                                        <p className="text-white font-semibold">{visit.visitType}</p>
                                        <p className="text-gray-300 text-sm">
                                            <span className="font-medium">Data:</span> {new Date(visit.visitDate).toLocaleDateString('pl-PL')}
                                        </p>
                                        {visit.visitNote && (
                                            <p className="text-gray-400 text-sm mt-2">
                                                <span className="font-medium">Notatka:</span> {visit.visitNote}
                                            </p>
                                        )}
                                        {visit.visitAttachment && (
                                            <a href={visit.visitAttachment} className="text-blue-400 hover:text-blue-300 text-sm mt-2 block">
                                                📎 Załącznik
                                            </a>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400 italic">Brak wpisów wizyt</p>
                            )}
                        </div>
                        <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition">
                            + Dodaj wizytę
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}