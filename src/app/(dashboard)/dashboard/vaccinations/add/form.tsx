"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addVacc } from "~/server/animal/animal.service";

interface PetOption {
    petId: number;
    petName: string;
}

export default function AddVaccinationForm({ pets }: { pets: PetOption[] }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        
        const vaccData = {
            petId: Number(formData.get("petId")),
            vaccType: formData.get("vaccType") as string,
            vaccDate: formData.get("vaccDate") as string,
            vaccDose: formData.get("vaccDose") as string,
            vaccNote: formData.get("vaccNote") as string,
        };

        try {
            await addVacc(vaccData);
            router.refresh();
            router.push("/dashboard/vaccinations");
        } catch (error) {
            console.error(error);
            alert("Wystąpił błąd przy zapisie. Spróbuj ponownie.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-5 sm:p-8 rounded-2xl shadow-md border border-gray-100 max-w-2xl mx-auto flex flex-col gap-5 sm:gap-6">
            <div>
                <label htmlFor="petId" className="block text-gray-700 font-semibold mb-2">Wybierz pacjenta *</label>
                <select name="petId" id="petId" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" defaultValue="">
                    <option value="" disabled>-- Wybierz zwierzaka --</option>
                    {pets.map(p => (
                        <option key={p.petId} value={p.petId}>{p.petName}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="vaccType" className="block text-gray-700 font-semibold mb-2">Nazwa szczepionki *</label>
                <input type="text" name="vaccType" id="vaccType" required placeholder="np. Nobivac DHP" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="vaccDate" className="block text-gray-700 font-semibold mb-2">Data podania *</label>
                    <input type="date" name="vaccDate" id="vaccDate" required defaultValue={new Date().toISOString().split('T')[0]} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                </div>
                <div>
                    <label htmlFor="vaccDose" className="block text-gray-700 font-semibold mb-2">Dawka *</label>
                    <input type="text" name="vaccDose" id="vaccDose" required placeholder="np. 1 ml" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                </div>
            </div>

            <div>
                <label htmlFor="vaccNote" className="block text-gray-700 font-semibold mb-2">Dodatkowe notatki</label>
                <textarea name="vaccNote" id="vaccNote" rows={3} placeholder="Opcjonalne uwagi..." className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"></textarea>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
                <button type="button" onClick={() => router.back()} className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition">
                    Anuluj
                </button>
                <button type="submit" disabled={isLoading} className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl disabled:opacity-50 transition">
                    {isLoading ? "Zapisywanie..." : "Dodaj szczepienie"}
                </button>
            </div>
        </form>
    );
}