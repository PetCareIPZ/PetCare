import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";import Icon from "~/components/Icon";import { db } from "~/server/db";
import { pets, drugs, vaccinations, visits } from "~/server/db/schema";
import { and, eq } from "drizzle-orm";

export default async function HealthCardPage({ params }: { params: { petId: string } }) {
    const { petId } = await params;
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
            eq(pets.petId, parseInt(petId))
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

    // Fetch all health data
    const [drugsData, vaccinationsData, visitsData] = await Promise.all([
        db.select().from(drugs).where(eq(drugs.petId, petId)),
        db.select().from(vaccinations).where(eq(vaccinations.petId, petId)),
        db.select().from(visits).where(eq(visits.petId, petId)),
    ]);

    return (
    <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-5xl mx-auto px-4">

        {/* Nawigacja */}
        <div className="flex justify-between mb-6 text-sm sm:text-base">
            <Link
            href={`/dashboard/${petId}`}
            className="text-primary hover:text-primary/80 font-medium transition"
            >
            ← Powrót do profilu
            </Link>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Karta Zdrowia - {petData?.petName}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Leki */}
            <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 flex flex-col">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Leki</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
                {drugsData.length > 0 ? (
                drugsData.map((drug) => (
                    <div key={drug.drugId} className="bg-gray-100 rounded p-4 border-l-4 border-red-500">
                    <p className="font-semibold text-gray-800">{drug.drugType}</p>
                    <p className="text-gray-600 text-sm">
                        <span className="font-medium">Data:</span> {new Date(drug.drugDate).toLocaleDateString('pl-PL')}
                    </p>
                    <p className="text-gray-600 text-sm">
                        <span className="font-medium">Dawka:</span> {drug.drugDose}
                    </p>
                    {drug.drugNote && (
                        <p className="text-gray-500 text-sm mt-1">
                        <span className="font-medium">Notatka:</span> {drug.drugNote}
                        </p>
                    )}
                    </div>
                ))
                ) : (
                <p className="text-gray-400 italic">Brak wpisów leków</p>
                )}
            </div>
            <button className="mt-4 w-full bg-primary hover:bg-primary/80 text-white font-semibold py-2 rounded-xl shadow transition">
                + Dodaj lek
            </button>
            </div>

            {/* Szczepionki */}
            <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 flex flex-col">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Szczepionki</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
                {vaccinationsData.length > 0 ? (
                vaccinationsData.map((vaccine) => (
                    <div key={vaccine.vaccinationId} className="bg-gray-100 rounded p-4 border-l-4 border-blue-500">
                    <p className="font-semibold text-gray-800">{vaccine.vaccinationType}</p>
                    <p className="text-gray-600 text-sm">
                        <span className="font-medium">Data:</span> {new Date(vaccine.vaccinationDate).toLocaleDateString('pl-PL')}
                    </p>
                    <p className="text-gray-600 text-sm">
                        <span className="font-medium">Dawka:</span> {vaccine.vaccinationDose}
                    </p>
                    {vaccine.vaccinationNote && (
                        <p className="text-gray-500 text-sm mt-1">
                        <span className="font-medium">Notatka:</span> {vaccine.vaccinationNote}
                        </p>
                    )}
                    </div>
                ))
                ) : (
                <p className="text-gray-400 italic">Brak wpisów szczepionek</p>
                )}
            </div>
            <button className="mt-4 w-full bg-primary hover:bg-primary/80 text-white font-semibold py-2 rounded-xl shadow transition">
                + Dodaj szczepionkę
            </button>
            </div>

            {/* Wizyty */}
            <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 flex flex-col">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Wizyty</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
                {visitsData.length > 0 ? (
                visitsData.map((visit) => (
                    <div key={visit.visitId} className="bg-gray-100 rounded p-4 border-l-4 border-green-500">
                    <p className="font-semibold text-gray-800">{visit.visitType}</p>
                    <p className="text-gray-600 text-sm">
                        <span className="font-medium">Data:</span> {new Date(visit.visitDate).toLocaleDateString('pl-PL')}
                    </p>
                    {visit.visitNote && (
                        <p className="text-gray-500 text-sm mt-1">
                        <span className="font-medium">Notatka:</span> {visit.visitNote}
                        </p>
                    )}
                    {visit.visitAttachment && (
                        <a href={visit.visitAttachment} className="text-blue-500 hover:text-blue-400 text-sm mt-1 block">
                        <Icon name="paperclip" /> Załącznik
                        </a>
                    )}
                    </div>
                ))
                ) : (
                <p className="text-gray-400 italic">Brak wpisów wizyt</p>
                )}
            </div>
            <button className="mt-4 w-full bg-primary hover:bg-primary/80 text-white font-semibold py-2 rounded-xl shadow transition">
                + Dodaj wizytę
            </button>
            </div>

        </div>
        </div>
    </div>
    );

}